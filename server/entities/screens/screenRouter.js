import ScreenController from './screenController';

const ScreenRouter = app => {
	const screenController = new ScreenController(app);

	app.get('/api/screens', screenController.getScreens.bind(screenController));
	app.get('/api/screens/:id', screenController.getScreens.bind(screenController));
	app.put('/api/screens/:id', screenController.changeScreen.bind(screenController));
	app.post('/api/screens/', screenController.changeScreen.bind(screenController));
	app.get('/api/generate-app', screenController.generateApp.bind(screenController));
}

module.exports = ScreenRouter;