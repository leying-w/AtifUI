import React from "react";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { AtifPolymerData, AtifPolymerParameters } from "../../dt/atif_polymer_parameters";
import { doParseFloatValue } from "../utils/values";


function AtifInputPolymerDataUI(props: {
    polymerData: AtifPolymerData,
    onPolymerDataChange: (data: AtifPolymerData) => Promise<void>
}) {
    const newData = new AtifPolymerData(structuredClone(props.polymerData))
    return <Stack spacing={2}>
        <TextField type={"number"}
            label={"monomer concentration"}
            helperText={"e.g., 0.1M"}
            value={props.polymerData.monomer_concentration}
            onChange={async (event) => {
                newData.monomer_concentration = doParseFloatValue(event.target.value, props.polymerData.monomer_concentration)
                await props.onPolymerDataChange(newData)
            }} />

        <TextField type={"number"}
            label={"polymerization"}
            helperText={"total monomer number of polymer"}
            value={props.polymerData.polymerization}
            onChange={async (event) => {
                newData.polymerization = doParseFloatValue(event.target.value, props.polymerData.polymerization)
                await props.onPolymerDataChange(newData)
            }} />

        <TextField type={"number"}
            label={"block number"}
            helperText={"sequence structure of polymer"}
            value={props.polymerData.block_number}
            onChange={async (event) => {
                newData.block_number = doParseFloatValue(event.target.value, props.polymerData.block_number)
                await props.onPolymerDataChange(newData)
            }} />

        <Autocomplete
            value={props.polymerData.chain_model}
            renderInput={(args) => {
                return <TextField {...args}
                    value={props.polymerData.chain_model}
                    label={"theoretical chain model"}
                    helperText={"e.g., flexible/rod/semi-flexible"}
                />
            }}
            onChange={async (event, value) => {
                newData.chain_model = value
                await props.onPolymerDataChange(newData)
            }}
            options={["flexible", "rod", "semi-flexible"]} />

        <TextField type={"number"}
            label={"bending potential for chain stiffness"}
            helperText={"e.g., 0.2/kBT"}
            value={props.polymerData.bending_potential}
            onChange={async (event) => {
                newData.bending_potential = doParseFloatValue(event.target.value, props.polymerData.bending_potential)
                await props.onPolymerDataChange(newData)
            }} />
    </Stack>
}

export function AtifInputPolymerUI(props: {
    polymerParameters: AtifPolymerParameters
    onPolymerParametersChange: (parameter: AtifPolymerParameters) => Promise<void>
}) {
    const newData = structuredClone(props.polymerParameters)

    return <Stack spacing={2}>
        <Typography variant={"h5"}>Polymer species 1:</Typography>

        <AtifInputPolymerDataUI polymerData={props.polymerParameters.one}
            onPolymerDataChange={async (data) => {
                newData.one = data
                await props.onPolymerParametersChange(newData)
            }} />

        <Typography variant={"h5"}>Polymer species 2:</Typography>

        <AtifInputPolymerDataUI polymerData={props.polymerParameters.two}
            onPolymerDataChange={async (data) => {
                newData.two = data
                await props.onPolymerParametersChange(newData)
            }} />
    </Stack>
}
