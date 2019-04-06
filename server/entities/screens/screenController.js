import util from 'util';
import child_process from 'child_process';
import mongoose from 'mongoose';
import fs from 'fs';

const exec = util.promisify(child_process.exec);
const USER_FOLDER = 'teste';

/**
 * TODO: Create validations for all endpoints
 */

class ScreenController {
    changeScreen (req, res){
        const {id} = req.params;
        
        if(id) {
            return this.updateScreen(id, req, res);
        }else {
            return this.addScreen(req, res);
        }
    }
	
	addScreen(req, res){
		const ScreenModel = mongoose.model('Screen'),
			data = {
                ...this.formatLayoutData(req.body, true)
            };

		ScreenModel.create(data)
			.then(resp => res.status(200).json(resp))
			.catch(err => res.status(500).json(err));
	}

	getScreens(req, res){
		let instance = this,
			ScreenModel = mongoose.model('Screen'),
			ScreenId = req.params.id;
		
		if(ScreenId){
			ScreenModel.findOne({ _id: ScreenId})
				.then(data => res.status(200).json(data))
				.catch(err => res.status(500).json({err}));
		}else {
			ScreenModel.find({})
				.then(data => res.status(200).json(data))
				.catch(err => res.status(500).json({err}));
		}
	}

    updateScreen(id, req, res) {
        const ScreenModel = mongoose.model('Screen');

        const data = {
            ...this.formatScreenData(req.body)
        }

        ScreenModel.findByIdAndUpdate(id, { 
            $set: data
        }, {}, (err, previousData)=>{
            if (err) res.status(500).json({status: 'error', err});

			res.status(200).json({
                previousData: previousData
            });
		});
    }

    formatLayoutData({layout, label, navigation, rightScreen, mainNavigation, statusBar, tabBar}, newData) {
        if(newData) {
            return this.getDefaultData({
                label
            });
        }

        return {
            label,
            layout,
            navigation,
            settings: {
                mainNavigation,
                statusBar: layout === 'stacked' ? statusBar : false,
                tabBar: layout === 'tab' ? tabBar : false,
                rightScreen
            }
        }
    }

    getDefaultData(data) {
        return {
            ...data,
            name: `screen${Date.now()}`, //It must be generated according to the screen label
            layout: 'tab',
            navigation: true,
            settings: {
                mainNavigation: {
                    color: '#fff',
                    backgroundColor: '#0082f3'
                },
                tabBar: {
                    activeTintColor: "tomato",
                    inactiveTintColor: "gray",
                    size: 25,
                    showLabel: false,
                    backgroundColor: "#0082f3"
                }
            }
        }
    }

    /**
     * TODO: move this code to a new controller entity,
     * like generateApp or something
     */
    generateApp(req, res) {
        const ScreenModel = mongoose.model('Screen');

        return (async () => {
            let data =  await ScreenModel.find({});

            data = data.reduce((newData, {name, layout, settings}) => ({
                ...newData,
                [name]: {
                    screen: layout,
                    settings
                }
            }), {});
    
            fs.readFile('./server/config/app-definition.js', 'utf8', async (err, readData) => {
                if (err) throw err;
    
                console.log(`\n Checking if there's already project created with the informed name`);
                await exec(`rm -rf ${USER_FOLDER}`);
    
                console.log('\n Creating the project folder: TESTE');
                await exec(`mkdir ${USER_FOLDER}`);
    
                console.log('\n Creating project files and installing dependencies...');
                const {stdout} = await exec('cd teste && yo nevinha-project');
    
                data = readData.replace('[TEMPLATE]', JSON.stringify(data));
    
                fs.writeFile(`${USER_FOLDER}/app/config.js`, data, async () =>{
                    console.log('\n ----------------------------------- Project TESTE has ben created! -----------------------------------')
                    console.log(stdout);
                    console.log('\n');
    
                    const resp = await exec('cd teste && react-native run-android');
                    console.log(resp.stdout)
                    
                    console.log('Starting simulation... [react-native run-android]');
    
                    res.json({
                        status: 'success'
                    })
                });
            });
        })();
    }
}

module.exports =  ScreenController;