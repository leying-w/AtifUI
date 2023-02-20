import React from "react";
import { TextField, Stack } from "@mui/material";

import { doParseFloatValue } from "../utils/values";
import { AtifWallParameters } from "../../dt/atif_wall_parameters";
import { MultiNumberValueTextField } from "../blocks/m_values";

export function AtifInputWallUI(props: {
    wallParameters: AtifWallParameters
    blockNumber: number
    blockNumber1: number
    blockNumber2: number
    onWallParametersChange: (parameter: AtifWallParameters) => Promise<void>
}) {
    const newData = new AtifWallParameters(structuredClone(props.wallParameters))

    return <Stack spacing={2}>
        <TextField type={"number"}
            label={"surface charge density"}
            helperText={"e.g., 0.10 e/nm^2"}
            value={props.wallParameters.surface_charge_density}
            onChange={async (event) => {
                newData.surface_charge_density = doParseFloatValue(event.target.value, props.wallParameters.surface_charge_density)
                await props.onWallParametersChange(newData)
            }} />

        <MultiNumberValueTextField
            label={"Ext_blocks"}
            helperText={`energy parameter of external potential model for the monomer in each block! data format (e.g., 1,2,...,nb1,1,2,...,nb2): nb1 = ${props.blockNumber1} and nb2 =${props.blockNumber2} `}
            error={props.wallParameters.sf_block_number.length != props.blockNumber}
            onMValuesChange={async (mValues) => {
                newData.sf_block_number = mValues
                await props.onWallParametersChange(newData)
            }}
        />


        <TextField type={"number"}
            label={"Ext_positive_salt"}
            value={props.wallParameters.sf_positive_salt}
            helperText={"energy parameter of external potential model for positive salt"}
            onChange={async (event) => {
                newData.sf_positive_salt = doParseFloatValue(event.target.value, props.wallParameters.sf_positive_salt)
                await props.onWallParametersChange(newData)
            }} />

        <TextField type={"number"}
            label={"Ext_negative_salt"}
            value={props.wallParameters.sf_negative_salt}
            helperText={"energy parameter of external potential model for negative salt"}
            onChange={async (event) => {
                newData.sf_negative_salt = doParseFloatValue(event.target.value, props.wallParameters.sf_negative_salt)
                await props.onWallParametersChange(newData)
            }} />

        <TextField type={"number"}
            label={"Ext_positive_counterions"}
            value={props.wallParameters.sf_positive_counterion}
            helperText={"energy parameter of external potential model for positive counterions"}
            onChange={async (event) => {
                newData.sf_positive_counterion = doParseFloatValue(event.target.value, props.wallParameters.sf_positive_counterion)
                await props.onWallParametersChange(newData)
            }} />

        <TextField type={"number"}
            label={"Ext_negative_counterions"}
            value={props.wallParameters.sf_negative_counterion}
            helperText={"energy parameter of external potential model for positive counterions"}
            onChange={async (event) => {
                newData.sf_negative_counterion = doParseFloatValue(event.target.value, props.wallParameters.sf_negative_counterion)
                await props.onWallParametersChange(newData)
            }} />

        <TextField type={"number"}
            label={"Ext_solvent"}
            value={props.wallParameters.sf_solvent}
            helperText={"energy parameter of external potential model for solvent"}
            onChange={async (event) => {
                newData.sf_solvent = doParseFloatValue(event.target.value, props.wallParameters.sf_solvent)
                await props.onWallParametersChange(newData)
            }} />
    </Stack>
}
