import React from "react";
import { Stack } from "@mui/material";

import { AtifEnergyParameters } from "../../dt/atif_energy_parameters";
import { MatrixNumberValueTextField, MultiNumberValueTextField } from "../blocks/m_values";

export function AtifInputEnergyUI(props: {
    energyParameters: AtifEnergyParameters
    blockNumber: number
    onEnergyParametersChange: (parameter: AtifEnergyParameters) => Promise<void>
}) {
    const newData = new AtifEnergyParameters(structuredClone(props.energyParameters))

    const blockNumberPlus4 = props.blockNumber + 4

    const helperText = `pairwise energy parameter for positive salt! Matrix format: row(${blockNumberPlus4})x cloumn(1)(e.g., ) `

    const haveError = props.energyParameters.pw_block_number.length != blockNumberPlus4

    console.log(props.energyParameters)

    return <Stack spacing={2}>
        <MatrixNumberValueTextField
            error={haveError}
            label={"pw_blocks"}
            helperText={`pairwise energy parameter for all blocks! Matrix format: row(${blockNumberPlus4}) x column(${blockNumberPlus4 - 4}) (e.g., all species x all blocks)`}
            onMatrixValuesChange={async (matrixValue) => {
                newData.pw_block_number = matrixValue
                await props.onEnergyParametersChange(newData)
            }} />


        <MultiNumberValueTextField
            error={props.energyParameters.pw_positive_salt.length != blockNumberPlus4}
            label={"pw_positive_salt"}
            helperText={`pairwise energy parameter for positive salt! Matrix format: row(${blockNumberPlus4}) x cloumn(1)(e.g., all species x positive salt)`}
            onMValuesChange={async (mValues) => {
                newData.pw_positive_salt = mValues
                await props.onEnergyParametersChange(newData)
            }} />

        <MultiNumberValueTextField
            error={props.energyParameters.pw_negative_salt.length != blockNumberPlus4}
            label={"pw_negative_salt"}
            helperText={`pairwise energy parameter for negative salt! Matrix format: row(${blockNumberPlus4}) x cloumn(1)(e.g., all species x negative salt)`}
            onMValuesChange={async (mValues) => {
                newData.pw_negative_salt = mValues
                await props.onEnergyParametersChange(newData)
            }} />

        <MultiNumberValueTextField
            error={props.energyParameters.pw_positive_counterions.length != blockNumberPlus4}
            label={"pw_positive_counterions"}
            helperText={`pairwise energy parameter for positive counterions! Matrix format: row(${blockNumberPlus4}) x cloumn(1)(e.g., all species x positive counterions)`}
            onMValuesChange={async (mValues) => {
                newData.pw_positive_counterions = mValues
                await props.onEnergyParametersChange(newData)
            }} />

        <MultiNumberValueTextField
            error={props.energyParameters.pw_negative_counterions.length != blockNumberPlus4}
            label={"pw_negative_counterions"}
            helperText={`pairwise energy parameter for negative counterions! Matrix format: row(${blockNumberPlus4}) x cloumn(1)(e.g., all species x negative counterions)`}
            onMValuesChange={async (mValues) => {
                newData.pw_negative_counterions = mValues
                await props.onEnergyParametersChange(newData)
            }} />
    </Stack>
}
