import {
  Tabs,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
} from '@strapi/design-system/Tabs'
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Divider } from '@strapi/design-system/Divider';
import {
  Layout,
  ContentLayout,
} from "@strapi/design-system/Layout";
import { Button } from '@strapi/design-system/Button';
import { TextInput } from '@strapi/design-system/TextInput';
import { Box } from '@strapi/design-system/Box';
import style from '../../style/style';
import SettingsTableItem from './SettingsTableItem';
import Header from './Header';
import http from '../../utils/http';
import CollectionsTableColumn from './CollectionsTableColumn';
import CollectionsTableHeader from './CollectionsTableHeader';
import { Dialog, DialogBody, DialogFooter } from '@strapi/design-system/Dialog';
import ExclamationMarkCircle from '@strapi/icons/ExclamationMarkCircle';
import Trash from '@strapi/icons/Trash';
import { Stack } from '@strapi/design-system/Stack';
import { Flex } from '@strapi/design-system/Flex';
import { Typography } from '@strapi/design-system/Typography';

let dataArray = [];
let exportSchema = {};
let importSchema = {};

const HomePage = () => {
  const [message, setMessage] = useState('');
  const [okButtonState, setOkButtonState] = useState(false);
  const [ConfigCollection, setConfigCollection] = useState([]);
  const [getConfigCollectionControl, setGetConfigCollectionControl] = useState(true)
  const [editMod, setEditMod] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  if (getConfigCollectionControl) {
    http.getConfigCollection().then((data) => {
      setConfigCollection(data.collections)
      if (data.swaggerUrl) {
        setEditMod(true)
        setMessage(data.swaggerUrl)
        getSchemas(data.swaggerUrl)
      }
    })
    setGetConfigCollectionControl(false)
  }

  const getSchemas = async (url) => {
    if (url) {
      exportSchema = await http.getExportSchema(url);
      importSchema = await http.getImportSchema();
      setOkButtonState(true);
    }
  }

  const handleClick = async (event) => {
    if (message) {
      exportSchema = await http.getExportSchema(message);
      importSchema = await http.getImportSchema();
      setOkButtonState(true);
    }
  };

  const handleChange = event => {
    setMessage(event.target.value);

  };

  const saveSelected = async (as) => {
    await http.addConfigCollection(message, dataArray);
    window.location.reload()
  }

  const getData = (childData) => {
    let id = childData.id;
    delete childData.id;
    dataArray[id] = childData;
  }

  const clearModel = async(e) => {
    await http.clearConfigCollection();
    window.location.reload()
  }


  return (

    <Layout>

      <Header />


      <Box padding={8} margin={10} background="neutral">
        <TabGroup label="Some stuff for the label" id="tabs">
          <Tabs>
            <Tab>Collections</Tab>
            <Tab>Settings</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <Box color="neutral800" padding={4} background={style.mainBackground}>

                <CollectionsTableHeader
                  setGetConfigCollectionControl={setGetConfigCollectionControl}
                />
                {
                  ConfigCollection.map((data, index) => (
                    <CollectionsTableColumn
                      key={index}
                      id={index}
                      data={data}
                      setGetConfigCollectionControl={setGetConfigCollectionControl}
                    />
                  ))
                }

              </Box>
            </TabPanel>
            <TabPanel>
              <Box color="neutral800" padding={1} style={{ paddingTop: "50px" }} background="neutral0">

                <ContentLayout>
                  <Box padding={style.mediumPadding} background={style.mainBackground} shadow={style.mainShadow} hasRadius={true}>

                    <TextInput disabled={editMod} label="V3 Swagger Url" placeholder="Swagger url" name="content" onChange={handleChange} value={message} />

                  </Box>
                  {editMod == false ? <Button onClick={handleClick} style={style.primaryButton}>Get Entity Model</Button> :
                    <Box padding={4}><Divider /></Box>}

                  {
                    Object.keys(importSchema).map((data, index) => (
                      <SettingsTableItem
                        key={index}
                        id={index}
                        tableName={data}
                        getData={getData}
                        exportSchema={exportSchema}
                        importSchema={importSchema}
                        editMod={editMod}
                        ConfigCollection={ConfigCollection}
                      />
                    ))
                  }
                  {okButtonState == true ?
                    (editMod == false ?
                      <Button onClick={saveSelected} style={style.primaryButton} >Save Selected</Button>
                      : <Layout>
                        <Button onClick={saveSelected} style={{
                          float: "left", 
                          marginTop: "20px",
                          height: "45px",
                          marginBottom: "20px",
                          marginRight: "20px"
                        }} >Save Change</Button>
                        <Button onClick={() => setIsVisible(true)} style={style.primaryButton} variant='danger' >Clear Model</Button>
                        <Dialog onClose={() => setIsVisible(false)} title="Confirmation" isOpen={isVisible}>
                          <DialogBody icon={<ExclamationMarkCircle />}>
                            <Stack spacing={2}>
                              <Flex justifyContent="center">
                                <Typography id="confirm-description">Are you sure you want to delete all model?</Typography>
                              </Flex>
                            </Stack>
                          </DialogBody>
                          <DialogFooter startAction={<Button onClick={() => setIsVisible(false)} variant="tertiary">
                            Cancel
                          </Button>} endAction={<Button onClick={clearModel} variant="danger-light" startIcon={<Trash />}>
                            Confirm
                          </Button>} />
                        </Dialog>

                      </Layout>)
                    :
                    <Box padding={8}><Divider /></Box>}


                </ContentLayout>

              </Box>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Box>

    </Layout>
  );
};





export default HomePage;
