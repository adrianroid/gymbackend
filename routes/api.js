const fs = require('fs');

const v1Routes = fs.readdirSync(`${__dirname}/route-files`);

function allRoutes(app) {
    v1Routes.forEach((resource) => {
        if (resource.substr(resource.lastIndexOf('.') + 1) !== 'js') return;
        const resourceName = resource.split('.')[0];
        // Routes
        app.use(`/api/${resourceName}`, require(`./route-files/${resource}`));
    });
}
module.exports = allRoutes;
