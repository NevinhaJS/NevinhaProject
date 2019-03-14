export default [
    {
        rightScreen: false,
        name: 'SimpleOne',
        layout: 'simple',
        navigation: true,
        settings: {
            nextScreen: 'SimpleTwo', 
            statusBarColor: '#6a51ae', 
            textColor: '#fff',
            numero: 1,
            pageName: 'Clique no botão para ir a próxima página'
        }
    },
    {
        rightScreen: false,
        name: 'SimpleTwo',
        layout: 'simple',
        navigation: false,
        settings: {
            nextScreen: 'SimpleOne',
            statusBarColor: '#ecf0f1', 
            textColor: '#000',
            pageName: 'Você foi a próxima página, clique a baixo para voltar'
        }
    }
]