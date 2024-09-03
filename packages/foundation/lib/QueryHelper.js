"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cds_1 = __importDefault(require("@sap/cds"));
class QueryHelper {
    removeCalculatedFields(req, entity) {
        const fields2delete = this.getFields2delete(entity);
        if (req.query.UPDATE) {
            this.removeCalculatedFieldsFromUpdate(req.query.UPDATE, fields2delete);
        }
        else if (req.query.INSERT) {
            this.removeCalculatedFieldsFromInsert(req.query.INSERT, fields2delete);
        }
    }
    getFields2delete(entity) {
        const keys = Object.keys(entity.elements);
        const result = keys
            .filter(key => {
            const obj = entity.elements[key];
            return obj['@calculated'];
        })
            .map(key => entity.elements[key].name);
        return result;
    }
    removeCalculatedFieldsFromInsert(insertQuery, fields2delete) {
        insertQuery.entries.forEach(entry => fields2delete.forEach(field2delete => delete entry[field2delete]));
    }
    removeCalculatedFieldsFromUpdate(updateQuery, fields2delete) {
        fields2delete.forEach(field2delete => delete updateQuery.data[field2delete]);
    }
    addAllExpands2Select(query) {
        const navKeys = Object.keys(query.elements)
            .filter(key => query.elements[key] instanceof cds_1.default.Composition);
        query.columns(head => {
            head('*');
            navKeys.forEach(navKey => {
                head[navKey]('*');
            });
        });
    }
}
exports.default = new QueryHelper();
//# sourceMappingURL=QueryHelper.js.map