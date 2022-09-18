import { request } from '@strapi/helper-plugin';

const http = {
    getExportSchema: async (url) => {
        return await request("/strapi-plugin-migrate-data/getExportSchema", {
            method: "POST",
            body: { url: url }
        });
    },
    getImportSchema: async () => {
        return await request("/strapi-plugin-migrate-data/getImportSchema", {
            method: "GET",
        });
    },
    addConfigCollection: async (swaggerUrl, selected) => {
        return await request('/strapi-plugin-migrate-data/addConfigCollection', {
            method: 'POST',
            body: {
                swaggerUrl: swaggerUrl,
                selected: selected
            }
        });
    },
    getConfigCollection: async () => {
        return await request('/strapi-plugin-migrate-data/getConfigCollection', {
            method: 'GET',
        });
    },
    deleteSelectedCollections: async (index) => {
        return await request('/strapi-plugin-migrate-data/deleteSelectedCollections', {
            method: 'Post',
            body: {
                index: index,
            }
        });
    },
    dataTransfer: async (data, index, checked) => {
        return await request('/strapi-plugin-migrate-data/dataTransfer', {
            method: 'Post',
            body: {
                data: data,
                index: index,
                clear: checked
            }
        });
    },
    relationTransfer: async (data, index) => {
        return await request('/strapi-plugin-migrate-data/relationTransfer', {
            method: 'Post',
            body: {
                data: data,
                index: index
            }
        });
    },
    clearConfigCollection: async () => {
        return await request('/strapi-plugin-migrate-data/clearConfigCollection', {
            method: 'Post',
        });
    }

}

export default http