import React from "react";
import {Stack, TextField} from "@mui/material";

import {doParseFloatValue} from "../utils/values";
import {AtifDiameterParameters} from "../../dt/atif_diameter_parameters";
import {MultiNumberValueTextField} from "../blocks/m_values";

export function AtifInputDiameterUI(props: {
    diameterParameters: AtifDiameterParameters
    blockNumber: number
    blockNumber1: number
    blockNumber2: number
    onDiameterParametersChange: (parameter: AtifDiameterParameters) => Promise<void>
}) {
    const newData = new AtifDiameterParameters(structuredClone(props.diameterParameters))

    return <Stack spacing={2}>
        <MultiNumberValueTextField
            label={"D_blocks"}
            error={props.diameterParameters.diameter_block_number.length != props.blockNumber}
            helperText={`diameter for the monomer in each block! data format(e.g., 1,2,...,nb1,1,2,...,nb2): nb1 = ${props.blockNumber1} and nb2 = ${props.blockNumber2}`}
            onMValuesChange={async (mValues) => {
                newData.diameter_block_number = mValues
                await props.onDiameterParametersChange(newData)
            }}/>

        <TextField type={"number"}
                   label={"D_positive_salt"}
                   value={props.diameterParameters.diameter_positive_salt}
                   onChange={async (event) => {
                       newData.diameter_positive_salt = doParseFloatValue(event.target.value, props.diameterParameters.diameter_positive_salt)
                       await props.onDiameterParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"D_negative_salt"}
                   value={props.diameterParameters.diameter_negative_salt}
                   onChange={async (event) => {
                       newData.diameter_negative_salt = doParseFloatValue(event.target.value, props.diameterParameters.diameter_negative_salt)
                       await props.onDiameterParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"D_positive_counterions"}
                   value={props.diameterParameters.diameter_positive_counterion}
                   onChange={async (event) => {
                       newData.diameter_positive_counterion = doParseFloatValue(event.target.value, props.diameterParameters.diameter_positive_counterion)
                       await props.onDiameterParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"D_negative_counterions"}
                   value={props.diameterParameters.diameter_negative_counterion}
                   onChange={async (event) => {
                       newData.diameter_negative_counterion = doParseFloatValue(event.target.value, props.diameterParameters.diameter_positive_counterion)
                       await props.onDiameterParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"D_solvent"}
                   value={props.diameterParameters.diameter_solvent}
                   onChange={async (event) => {
                       newData.diameter_solvent = doParseFloatValue(event.target.value, props.diameterParameters.diameter_solvent)
                       await props.onDiameterParametersChange(newData)
                   }}/>
    </Stack>
}
