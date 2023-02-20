import React from "react";
import {TextField, Stack} from "@mui/material";

import {doParseFloatValue} from "../utils/values";
import {AtifIterativeParameters} from "../../dt/atif_iterative_parameters";

export function AtifInputIterativeUI(props: {
    iterativeParameters: AtifIterativeParameters
    onIterativeParametersChange: (parameter: AtifIterativeParameters) => Promise<void>
}) {
    const newData = new AtifIterativeParameters(structuredClone(props.iterativeParameters))

    return <Stack spacing={2}>
        <TextField type={"number"}
                   label={"maximum iterations"}
                   helperText={"e.g., 2000000"}
                   value={props.iterativeParameters.max_itera}
                   onChange={async (event) => {
                       newData.max_itera = doParseFloatValue(event.target.value, props.iterativeParameters.max_itera)
                       await props.onIterativeParametersChange(newData)
                   }}/>


        <TextField type={"number"}
                   label={"mixing coefficient"}
                   helperText={"for Picard iteration method (e.g., 0.01)"}
                   value={props.iterativeParameters.mix_coe}
                   onChange={async (event) => {
                       newData.mix_coe = doParseFloatValue(event.target.value, props.iterativeParameters.mix_coe)
                       await props.onIterativeParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"charging step"}
                   helperText={"step number for changing surface charge density (e.g., 1)"}
                   value={props.iterativeParameters.cstep}
                   onChange={async (event) => {
                       newData.cstep = doParseFloatValue(event.target.value, props.iterativeParameters.cstep)
                       await props.onIterativeParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"initialize the surface potential"}
                   helperText={"e.g., 0.1V"}
                   value={props.iterativeParameters.guess_surface_potential}
                   onChange={async (event) => {
                       newData.guess_surface_potential = doParseFloatValue(event.target.value, props.iterativeParameters.guess_surface_potential)
                       await props.onIterativeParametersChange(newData)
                   }}/>

        <TextField type={"number"}
                   label={"error tolerance"}
                   helperText={"e.g., 1.0E-7"}
                   value={props.iterativeParameters.error_tolerance}
                   onChange={async (event) => {
                       newData.error_tolerance = doParseFloatValue(event.target.value, props.iterativeParameters.error_tolerance)
                       await props.onIterativeParametersChange(newData)
                   }}/>
    </Stack>
}
