import cds from '@sap/cds';

class QueryHelper {
    removeCalculatedFields(req: cds.Request, entity: cds.entity): void {
        const fields2delete = this.getFields2delete(entity);

        if (req.query.UPDATE) {
            this.removeCalculatedFieldsFromUpdate(req.query.UPDATE, fields2delete);
        } else if (req.query.INSERT) {
            this.removeCalculatedFieldsFromInsert(req.query.INSERT, fields2delete);
        }
    }

    getFields2delete(entity: cds.entity) {
        const result = entity.elements
            .filter(element => {
                const obj = element as { [key: string]: any };
                return obj['@calculated'];
            })
            .map(element => element.name);

        return result;
    }

    removeCalculatedFieldsFromInsert(insertQuery: cds.Query['INSERT'], fields2delete: string[]): void {
        insertQuery.entries.forEach(entry =>
            fields2delete.forEach(field2delete => delete entry[field2delete])
        );
    }

    removeCalculatedFieldsFromUpdate(updateQuery: cds.Query['UPDATE'], fields2delete: string[]): void {
        fields2delete.forEach(field2delete => delete updateQuery.data[field2delete]);
    }

    addAllExpands2Select<T extends Object>(query: cds.ql.SELECT<T>) {
        const navKeys = Object.keys(query.elements)
            .filter(key => query.elements[key] instanceof cds.Composition);

        query.columns(head => {
            head('*');
            navKeys.forEach(navKey => {
                head[navKey]('*');
            });
        });
    }
}

export default new QueryHelper();