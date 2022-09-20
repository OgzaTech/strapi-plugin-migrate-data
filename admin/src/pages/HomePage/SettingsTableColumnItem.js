
import { useState, useEffect } from 'react';
import React from 'react';

import { Box } from '@strapi/design-system/Box';
import { Field, FieldLabel, FieldHint, FieldError, FieldInput, FieldAction } from '@strapi/design-system/Field';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import { GridLayout } from '@strapi/design-system/Layout';
import style from '../../style/style';

const SettingsTableColumnItem = (props) => {
    const [columnItemCombobox, setColumnItemCombobox] = useState();
    const [selectType, setSelectType] = useState();
    const [onceRunControl, setOnceRunControl] = useState(true);

    if (onceRunControl && props.editMod) {
        props.mappingsColumn.map((dt) => {
            if(dt.targetField == props.columnName){
                setSelectType(dt.type);
                setColumnItemCombobox(dt.sourceField)
            }
        });

        setOnceRunControl(false)
    }

    if (onceRunControl && !props.editMod) {
        if (props.exportTableColumns[props.columnItemComboArray[props.id]]) {
            setSelectType(props.exportTableColumns[props.columnItemComboArray[props.id]].type);
        }
        setColumnItemCombobox(props.columnItemComboArray[props.id])
        setOnceRunControl(false)
    }
    const handleChangeCombo = async (e) => {
        if (props.exportTableColumns[e]) {
            setSelectType(props.exportTableColumns[e].type);
        } else if (e == null) {
            setSelectType(undefined);
        }
        setColumnItemCombobox(e)
        let arr = props.columnItemComboArray;
        arr[props.id] = e;
        props.setColumnItemComboArray(arr)
    };


    useEffect(() => {
        props.getColumnData({ id: props.id, importColumnName: props.columnName, exportColumnName: columnItemCombobox, type: selectType });
    }, [columnItemCombobox]);

    return (

        <GridLayout>
            <Box padding={style.mediumPadding} hasRadius={true} background={style.mainBackground}>
                <FieldInput placeholder="Placeholder" value={props.columnName} disabled={true} />
            </Box>

            <Box padding={style.mediumPadding} hasRadius={true} background={style.mainBackground}>
                <Combobox aria-label="Colon" value={columnItemCombobox} onChange={handleChangeCombo}>

                    {
                        Object.keys(props.exportTableColumns).map((data, index) => (
                            <ComboboxOption key={index} value={data}>{data}</ComboboxOption>
                        ))
                    }


                </Combobox>
            </Box>


        </GridLayout>

    );
}


export default SettingsTableColumnItem;