import ScreenController from './screenController';

const ScreenRouter = app => {
	const screenController = new ScreenController(app);

	app.put('/api/screens/:id', screenController.changeScreen.bind(screenController));
	app.get('/api/generate-app', screenController.generateApp.bind(screenController));
}

module.exports = ScreenRouter;