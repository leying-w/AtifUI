import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getBrowserLogger } from "../../log/browser";
import { AtifInputMethodUI } from "../input/method";
import { AtifMethodParameters } from "../../dt/atif_method_parameters";
import { AtifInputPolymerUI } from "../input/polymer";
import { AtifPolymerParameters } from "../../dt/atif_polymer_parameters";
import { AtifInputSequenceUI } from "../input/sequence";
import { AtifSequenceParameters } from "../../dt/atif_sequence_parameters";
import { AtifSizeParameters } from "../../dt/atif_size_parameters";
import { AtifInputSizeUI } from "../input/size";
import { AtifSaltParameters } from "../../dt/atif_salt_parameters";
import { AtifInputSaltUI } from "../input/salt";
import { AtifWallParameters } from "../../dt/atif_wall_parameters";
import { AtifInputWallUI } from "../input/wall";
import { AtifEnergyParameters } from "../../dt/atif_energy_parameters";
import { AtifInputEnergyUI } from "../input/energy";
import { AtifValencyParameters } from "../../dt/atif_valency_parameters";
import { AtifInputValencyUI } from "../input/valency";
import { AtifDiameterParameters } from "../../dt/atif_diameter_parameters";
import { AtifInputDiameterUI } from "../input/diameter";
import { AtifPermitemlenParameters } from "../../dt/atif_permitemlen_parameters";
import { AtifInputPermitemUI } from "../input/permitemlen";
import { AtifIterativeParameters } from "../../dt/atif_iterative_parameters";
import { AtifInputIterativeUI } from "../input/iterative";
import { AtifRunParameters } from "../../dt/atif_run_parameters";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { InputWrapperBlock } from "../blocks/input_wrapper";
import { OutputFileBlock } from "../blocks/output_file_ui";
import { ipcRenderer } from "electron";
import { globalEvents } from "../../events";


// App 展示组件
function AppComponent() {
    const log = getBrowserLogger("root")
    log.debug("app start")

    const [methodParameters, setMethodParameters] = useState<AtifMethodParameters>(new AtifMethodParameters())
    const [polymerParameters, setPolymerParameters] = useState<AtifPolymerParameters>(new AtifPolymerParameters())
    const [sequenceParameters, setSequenceParameters] = useState<AtifSequenceParameters>(new AtifSequenceParameters())
    const [sizeParameters, setSizeParameters] = useState<AtifSizeParameters>(new AtifSizeParameters())
    const [saltParameters, setSaltParameters] = useState<AtifSaltParameters>(new AtifSaltParameters())
    const [wallParameters, setWallParameters] = useState<AtifWallParameters>(new AtifWallParameters())
    const [energyParameters, setEnergyParameters] = useState<AtifEnergyParameters>(new AtifEnergyParameters())
    const [valencyParameters, setValencyParameters] = useState<AtifValencyParameters>(new AtifValencyParameters())
    const [diameterParameters, setDiameterParameters] = useState<AtifDiameterParameters>(new AtifDiameterParameters())
    const [permitemlenParameters, setPermitemlenParameters] = useState<AtifPermitemlenParameters>(new AtifPermitemlenParameters())
    const [iterativeParameters, setIterativeParameters] = useState<AtifIterativeParameters>(new AtifIterativeParameters())
    const [filepath, setFilepath] = useState("")

    const run = new AtifRunParameters()

    run.methodParameter = methodParameters
    run.polymerParameter = polymerParameters
    run.sequenceParameters = sequenceParameters
    run.sizeParameters = sizeParameters
    run.saltParameters = saltParameters
    run.wallParameters = wallParameters
    run.energyParameters = energyParameters
    run.valencyParameters = valencyParameters
    run.diameterParameters = diameterParameters
    run.permitemlenParameters = permitemlenParameters
    run.iterativeParameters = iterativeParameters
    run.filepath = filepath


    return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1em" }}>
        <div>
            <InputWrapperBlock
                name={"Method"} subTitle={"theory and system setting"}
                innerUI={<AtifInputMethodUI
                    methodParameters={methodParameters}
                    onMethodParameterChange={async (data) => {
                        setMethodParameters(new AtifMethodParameters(data))
                    }} />}
            />
            <InputWrapperBlock
                name={"Polymer"} subTitle={"details of polymer species"}
                innerUI={
                    <AtifInputPolymerUI
                        polymerParameters={polymerParameters}
                        onPolymerParametersChange={async (data) => {
                            setPolymerParameters(new AtifPolymerParameters(data))
                        }} />
                }
            />
            <InputWrapperBlock
                name={"Sequence"} subTitle={"monomer number in each block and corresponding valency"}
                innerUI={
                    <AtifInputSequenceUI
                        sequenceParameters={sequenceParameters}
                        blockNumber1={polymerParameters.one.block_number}
                        blockNumber2={polymerParameters.two.block_number}
                        onSequenceParametersChange={async (data) => {
                            setSequenceParameters(new AtifSequenceParameters(data))
                        }} />
                }
            />
            <InputWrapperBlock
                name={"Size"} subTitle={"box size and step length"}
                innerUI={
                    <AtifInputSizeUI
                        sizeParameters={sizeParameters}
                        onSizeParametersChange={async (data) => {
                            setSizeParameters(new AtifSizeParameters(data))
                        }} />
                } />
            <InputWrapperBlock
                name={"Salt"} subTitle={"salt concentration and volume fraction"}
                innerUI={
                    <AtifInputSaltUI
                        saltParameters={saltParameters}
                        onSaltParametersChange={async (data) => {
                            setSaltParameters(new AtifSaltParameters(data))
                        }} />
                }
            />
            <InputWrapperBlock name={"Wall"} subTitle={"external interaction from wall [/kBT]"}
                innerUI={
                    <AtifInputWallUI
                        wallParameters={wallParameters}
                        blockNumber1={polymerParameters.one.block_number}
                        blockNumber2={polymerParameters.two.block_number}
                        blockNumber={polymerParameters.one.block_number + polymerParameters.two.block_number}
                        onWallParametersChange={async (data) => {
                            setWallParameters(new AtifWallParameters(data))
                        }} />
                }
            />
            <InputWrapperBlock name={"Energy"} subTitle={"pairwise interaction among all species [/kBT]"}
                innerUI={
                    <AtifInputEnergyUI
                        energyParameters={energyParameters}
                        blockNumber={polymerParameters.one.block_number + polymerParameters.two.block_number}
                        onEnergyParametersChange={async (data) => {
                            setEnergyParameters(new AtifEnergyParameters(data))
                        }} />
                } />
            <InputWrapperBlock
                name={"Valency"} subTitle={"valency of small ions"}
                innerUI={
                    <AtifInputValencyUI
                        valencyParameters={valencyParameters}
                        onValencyParametersChange={async (data) => {
                            setValencyParameters(new AtifValencyParameters(data))
                        }} />
                } />
            <InputWrapperBlock name={"Diameter"} subTitle={"reduced diameter of all species: D/d"}
                innerUI={
                    <AtifInputDiameterUI diameterParameters={diameterParameters}
                        blockNumber={polymerParameters.one.block_number + polymerParameters.two.block_number}
                        blockNumber1={polymerParameters.one.block_number}
                        blockNumber2={polymerParameters.two.block_number}
                        onDiameterParametersChange={async (data) => {
                            setDiameterParameters(new AtifDiameterParameters(data))
                        }} />
                } />
            <InputWrapperBlock name={"Permitem"} subTitle={"key parameters of system"}
                innerUI={
                    <AtifInputPermitemUI permitemlenParameters={permitemlenParameters}
                        onPermitemParametersChange={async (data) => {
                            setPermitemlenParameters(new AtifPermitemlenParameters(data))
                        }} />
                } />
            <InputWrapperBlock name={"Iterative"} subTitle={"convergence information"}
                innerUI={
                    <AtifInputIterativeUI iterativeParameters={iterativeParameters}
                        onIterativeParametersChange={async (data) => {
                            setIterativeParameters(new AtifIterativeParameters(data))
                        }} />
                } />

            <InputWrapperBlock name={"File"} subTitle={"please give the path of output result"}
                innerUI={
                    <OutputFileBlock filepath={filepath}
                        onFilepathChange={async (filepath) => {
                            setFilepath(filepath)
                        }} />
                } />


            <div style={{ display: "flex", justifyContent: "center", paddingTop: "1em" }}>
                <Button variant={"outlined"}
                    onClick={async () => {
                        await ipcRenderer.invoke(globalEvents.event_atif_start_run, run)
                    }}>Run</Button>
            </div>
        </div>
        <div>
            <Card>
                <CardContent>
                    <Typography variant={"h5"}>Parameter Preview:</Typography>
                    <pre>{run.toString()}</pre>
                </CardContent>
            </Card>
        </div>
    </div>
}

const root = createRoot(document.querySelector("#root"));

root.render(<AppComponent />)
