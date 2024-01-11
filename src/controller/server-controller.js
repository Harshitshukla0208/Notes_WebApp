exports.homepage = async(req, res) => {
    const locals = {
        title: 'Notes App',
        description: 'Notes App using Node.JS'
    }
    res.render('index', locals);
}
exports.about = async(req, res) => {
    const locals = {
        title: 'About - Notes App',
        description: 'Notes App using Node.JS'
    }
    res.render('about', locals);
}