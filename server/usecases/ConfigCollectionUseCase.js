const fs = require('fs');
const stringFormatter = require('../utils/StringFormatter');
const axios = require('axios');

module.exports = class ConfigCollectionUseCase {
    async savePostData(selected, baseUrl,swaggerUrl, jsonPath) {
        let jsonContent={
            swaggerUrl:swaggerUrl,
            collections:[]
        };
       
        for (let select of selected) {
            if (!select.columns || select.columns.length == 0 || !select.exportTableName) {
                continue
            }
            let content = {};
            let mappings = [];
            let count;

            let path = await stringFormatter.makePlural(select.exportTableName);

            count = await axios.get(baseUrl + path + '/count').catch((err) => {
                return { data: 0 };
            });

            for (let column of select.columns) {
                if (!column.exportColumnName) {
                    continue
                }
                let columnObject = {};
                columnObject.sourceField = column.exportColumnName;
                columnObject.targetField = column.importColumnName;
                columnObject.isRelation = column.type == 'relation' ? true : false;
                columnObject.type = column.type
                mappings.push(columnObject);
            }


            content.targetTableName = select.importTableName;
            content.sourceTableName = select.exportTableName;
            content.itemCount = count.data;
            content.transferedDataCount = 0;
            content.transferedRelationCount = 0;
            content.sourceUrl = baseUrl + path;
            content.isCompleted = false;
            content.isDataMigrated = false;
            content.isRelationMigrated = false;
            content.mappings = mappings;

            jsonContent.collections.push(content)
        }
        fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8')
    }
    async deleteSelectedCollections(jsonPath, index) {
        let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
        let newJsonContent = [];
        jsonContent = JSON.parse(jsonContent);
        jsonContent.collections.map((dt, i) => {
            if (i == index) { }
            else { newJsonContent.push(dt) }
        })
        if(newJsonContent.length == 0){
            jsonContent.swaggerUrl = null;
        }
        jsonContent.collections = newJsonContent;
        fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8');
        return jsonContent;
    }
    async getConfigCollections(jsonPath) {
        let jsonContent = fs.readFileSync(jsonPath, 'utf-8');
        jsonContent = JSON.parse(jsonContent);
        return jsonContent
    }
    async clearConfigCollection(jsonPath) {
        let jsonContent = {
            swaggerUrl: null,
            collections:[]
        }
        fs.writeFileSync(jsonPath, JSON.stringify(jsonContent), 'utf-8');

        return jsonContent
    }

}