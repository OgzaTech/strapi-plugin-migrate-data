
<h1  align="center">Merge Data v3 → v4</h1>

  

You can move your strapi V3 data to V4 with the APIs that strapi has made available. In order to use the plugin, swagger must be used on both sides.

  

## Swagger Install “V4”:

  

with `npm`:

```bash

npm install @strapi/plugin-documentation

```

  

with `yarn`:

```bash

yarn add @strapi/plugin-documentation

```

  

To apply the plugin to Strapi, a re-build is needed:

```bash

strapi build

```

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/swagger_installed.png"  alt="Migrate-data"  height="200"  />

</p>

  

[To install swagger on the Strapi V3.](https://docs-v3.strapi.io/developer-docs/latest/development/plugins/documentation.html)

  

## SETUP:

  

This plugin is developed for V4.

  

Add the package into your Strapi project:

  

with `npm`:

```bash

npm install strapi-plugin-merge-data

```

  

with `yarn`:

```bash

yarn add strapi-plugin-merge-data

```

  

After these steps Strapi should be re-built:

```bash

strapi build

```

  

Strapi should be run in the next step:

```bash

strapi start

// or

yarn start

```

  

The plugin works in Production mode. The above command runs Strapi in "Production" mode. This plugin does not support "Developer" mode.
  
  

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/installed_migrate_data.png"  alt="Migrate-data"  height="250"  />

</p>

  

## GETTING STARTED:

  

When migrating from V3 to V4, the "find" and "count" apis in the corresponding table of V3 should be in the "public" role.

  

## Selecting and adding tables

  

Open the "Settings" tab, enter the Swagger URL of V3 here and press the “Get Entity Model” button.

  

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/settings.png"  alt="Migrate-data"  height="230"  />

</p>

  

On the left, there is a table where tables of V4 can be selected, and on the right, tables from V3 can be selected.

  

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/settings_table.png"  alt="Migrate-data"  height="180"  />

</p>

  

After selecting the V3 table that corresponds to the table in V4, press OK and select the relevant columns. The values on the left show the columns of the selected table belonging to V4, and the values on the right show the columns of the selected table belonging to V3.  We select the columns V3 that will correspond to the columns of the table selected in V4. Columns with the same names are automatically selected and can be edited if desired. After making all the selections, the "save selected" button at the bottom is pressed.

  

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/settings_select_column.png"  alt="Migrate-data"  height="300"  />

</p>

  

Additions are shown in the "collection" tab. If the "Clear Table" option is checked,all data in the relevant table is deleted before data transfer, and then data transfer starts. If there is a relationship between two tables, make sure that the mappings are correct. The data should be exported to V4 with the ID number in the V3 table. For this reason, before clicking the "relation transfer" button, you must have transferred the data of the related tables correctly, otherwise the relations will not be transferred. Another thing to consider is to make sure that data with the same credential does not already exist in version 4 before transferring the data. If data has been transferred with the same ID number before, the new data will not be transferred to V4. For all these reasons, it is recommended to transfer data to clean tables, otherwise relationships may be established incorrectly.

  

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/collection.png"  alt="Migrate-data"  height="210"  />

</p>

If there is a collection attached, it can be edited from the "settings" tab.  "Save Change" button can be used to save changes. If it is desired to continue with a new Swagger, all collections can be deleted with the "Clear Collections" button atthe bottom.

<p  align="center">

<img  src="https://raw.githubusercontent.com/OgzaTech/strapi-plugin-migrate-data/main/assets/edit_collections.png"  alt="Migrate-data"  height="300"  />

</p>
