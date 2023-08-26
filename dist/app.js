"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_config_1 = require("./config/db.config");
const main_route_1 = __importDefault(require("./routes/main.route"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default));
app.use(main_route_1.default);
mongoose_1.default.connect(db_config_1.DBConfig.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    app.listen(db_config_1.DBConfig.port, () => {
        console.log('Server is running on port:', db_config_1.DBConfig.port);
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
