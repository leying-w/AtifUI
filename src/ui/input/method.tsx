import React from "react";
import {TextField, Stack, Autocomplete} from "@mui/material";

import {AtifMethodParameters} from "../../dt/atif_method_parameters";
import {doParseFloatValue} from "../utils/values";


interface AtifInputMethodUIProps {
    methodParameters: AtifMethodParameters
    onMethodParameterChange: (parameter: AtifMethodParameters) => Promise<void>
}

export function AtifInputMethodUI(props: AtifInputMethodUIProps) {
    const newMethodParameters = new AtifMethodParameters(structuredClone(props.methodParameters))

    return <Stack spacing={2}>
        <Autocomplete
            value={props.methodParameters.method}
            renderInput={(args) => {
                return <TextField {...args}
                                  value={props.methodParameters.method}
                                  label={"theory"}
                                  helperText={"Atif software: Density Functional Theory(DFT) or Self-Consistent Field Theory(SCFT)"}/>
            }}
            onChange={async (event, value) => {
                newMethodParameters.method = value
                await props.onMethodParameterChange(newMethodParameters)
            }}
            options={['DFT', 'SCFT']}/>

        <Autocomplete
            value={props.methodParameters.geometry}
            renderInput={(args) => {
                return <TextField {...args}
                                  value={props.methodParameters.geometry}
                                  label={"geometry of surface"}
                                  helperText={"e.g.,Planar/Spherical/Cylindrical"}
                                  onChange={async (event) => {
                                      newMethodParameters.geometry = event.target.value
                                      await props.onMethodParameterChange(newMethodParameters)
                                  }}/>
            }}
            onChange={async (event, value) => {
                newMethodParameters.geometry = value
                await props.onMethodParameterChange(newMethodParameters)
            }}
            options={['Planar', 'Spherical', 'Cylindrical']}/>

        <Autocomplete
            value={props.methodParameters.surface}
            renderInput={(args) => {
                return <TextField {...args}
                                  value={props.methodParameters.surface}
                                  label={"surface number"}
                                  helperText={"e.g., two (confined system)"}/>
            }}
            onChange={async (event, value) => {
                newMethodParameters.surface = value
                await props.onMethodParameterChange(newMethodParameters)
            }}
            options={['Single', 'Two']}/>

        <Autocomplete
            value={props.methodParameters.srep}
            renderInput={(args) => {
                return <TextField {...args}
                                  value={props.methodParameters.srep}
                                  label={"external potential model"}
                                  helperText={"Lenard-Jones(LJ) model or Square-well(SW) model"}
                />
            }}
            onChange={async (event, value) => {
                newMethodParameters.srep = value
                await props.onMethodParameterChange(newMethodParameters)
            }}
            options={['LJ', 'SW']}/>

        <TextField
            type={"number"}
            value={props.methodParameters.charge_shell_model[0].toString()}
            label={"charge shell model A"}
            helperText={"A&B: parameters in charge shell model (0<=B<=A<=1)"}
            onChange={async (event) => {
                const value = doParseFloatValue(event.target.value, newMethodParameters.charge_shell_model[0])
                newMethodParameters.charge_shell_model[0] = value
                await props.onMethodParameterChange(newMethodParameters)
            }}
        />

        <TextField
            type={"number"}
            value={props.methodParameters.charge_shell_model[1].toString()}
            label={"charge shell model B"}
            helperText={"A&B: parameters in charge shell model (0<=B<=A<=1)"}
            onChange={async (event) => {
                const value = doParseFloatValue(event.target.value, newMethodParameters.charge_shell_model[1])
                newMethodParameters.charge_shell_model[1] = value
                await props.onMethodParameterChange(newMethodParameters)
            }}
        />
    </Stack>
}


