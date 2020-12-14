/******************************************************************************
 COPYRIGHT (C)
 ******************************************************************************
 LARsys-Automation GmbH
 Sinzinger Straße 3
 5122 Hochburg-Ach
 AUSTRIA
 ******************************************************************************
 Tel.: +43 (0) 7727 / 3250 - 0
 Fax.: +43 (0) 7727 / 3250 - 33
 E-Mail: office@larsys.com
 www.larsys.com
 *****************************************************************************/
// Defines
//onload files
var statusBitsFile = 'SrmStatus.csv?t=' + new Date().getTime(); 				// the location of the statusBits
var levelControlVersionFile = 'LevelControlVersion?t=' + new Date().getTime();			// the location of the LevelControlVersion
var ssiVersionFile = 'SsiVersion?t=' + new Date().getTime();					// the location of the ssi-Version
var operatorPanelEnabledFile = 'OperatorPanelEnabled?t=' + new Date().getTime();			// the location to check if OperatorPanel is enabled
var operatorPanelNameFile = 'OperatorPanelName?t=' + new Date().getTime();			// the location of the name of OperatorPanel
var canRestartFile = 'CANrestart?t=' + new Date().getTime();					// the location of the CAN restart counter
var srmFwFile = 'Firmwareversion?t=' + new Date().getTime();				// the location of the Srm 1 Firmware version
var typeFile = 'Type?t=' + new Date().getTime();							// the location of the Type (Navette || Lift)
var projectTypeFile = 'ProjectType?t=' + new Date().getTime();					// the location of the ProjectType (G1 || G2)
var hostnameFile = 'Hostname?t=' + new Date().getTime();						// the location of the Hostname
var srmNameFile = 'Name?t=' + new Date().getTime();							// the location of the Name of Srm
var srmEnabledFile = 'Enabled?t=' + new Date().getTime();						// the location of the info if SRM is enabled
var startupFile = 'startup.txt?t=' + new Date().getTime();					// the location of the startup information
var softwareFile = 'software?t=' + new Date().getTime();						// the location of the linux software information
var hardwareFile = 'hardware?t=' + new Date().getTime();						// the location of the linux hardware information
var navetteNodesFile = 'NavetteNodes.csv?t=' + new Date().getTime();					// the location of the Nodes of Navette
var liftNodesFile = 'LiftNodes.csv?t=' + new Date().getTime();					// the location of the Nodes of Lift

//cyclic loaded file
var srmStatusFile = 'CurrSrmStatus.html';									// the location of the current status
var srmTimeoutFile = 'Timeout';											// the location of the communication timeout Srm
var srmKeySwitchModeFile = 'KeySwitchMode';										// the location of the keyswitch state file of srm
var srmComSendQualityFile = 'ComSendQuality';										// the location of the com send quality of srm
var operatorPanelKeySwitchFile = 'OperatorPanelKeySwitchMode';							// the location of the keyswitch state of OperatorPanel
var levelControlKeySwitchModeFile = 'LevelControlKeySwitchMode';							// the location of the keyswitch state of LevelControl
var memoryUsageFile = 'MemoryUsage';										// the location of the memory usage of plc process

var checked = 'img/icon_checked.png';		// checked icon
var checked_grey = 'img/icon_checked_grey.png';	// checked icon grey
var warning = 'img/icon_warning.png';		// warning icon
var warning_grey = 'img/icon_warning_grey.png';	// warning icon grey
var error = 'img/icon_error.png';			// error icon
var error_grey = 'img/icon_error_grey.png';	// error icon grey
var empty = 'img/empty.png';				// the empty icon (1px transparent)

var NUM_OF_SRM = 2;
var QUALITY_FACTOR = 100; // Factor: 100 ... 100.00 %

var type = "";
var projectType = "G1";

var keypapdsCollapsed = true;
var memoryUsageCollapsed = true;
var linuxVersionCollapsed = true;
var firmwareCollapsed = new Array(NUM_OF_SRM);
var qualityCollapsed = new Array(NUM_OF_SRM);

var srmEnabled = new Array(NUM_OF_SRM);
var operatorPanelEnabled = false;

// Global variables
var srmTimeout = new Array(NUM_OF_SRM);	// Timeout Srm
var Modes = new Array();				// defines of the Modes
var StatusBits = new Array();			// defines of the Srm StatusBits
var StatusXBits = new Array();			// defines of the Srm StatusXBits
var StatusYBits = new Array();			// defines of the Srm StatusYBits
var SystemStatus1Bits = new Array();	// defines of the SystemStatus1Bits (1434)
var SystemStatus2Bits = new Array();	// defines of the SystemStatus2Bits (1434)
var SystemStatus3Bits = new Array();	// defines of the SystemStatus3Bits (1434)
var SystemStatus4Bits = new Array();	// defines of the SystemStatus4Bits (1434)
var StatusLSD1Bits = new Array();		// defines of the LSD1Bits (1434)
var StatusLSD2Bits = new Array();		// defines of the LSD2Bits (1434)
var Info1Bits = new Array();			// defines of the Info1Bits (1434)
var Info2Bits = new Array();			// defines of the Info2Bits (1434)
var NavetteNodes = new Array();			// defines of the NavetteNodes
var LiftNodes = new Array();			// defines of the LiftNodes


function onBlur() {

    document.body.className = 'blurred';
    grayOut(true);

};
function onFocus() {
    document.body.className = 'focused';

    grayOut(false);

    // Restart
    loadLevelControlStatus();

    for (var srmId = 1; srmId <= NUM_OF_SRM; srmId++) {
        loadSrmStatus(srmId);
    }
};
function onActive() {
    document.body.className = 'focused';
}

// Override the blur
// Used for LARsys-Debug
// -> HINT above Functions are not mounted
if (document.URL.indexOf("active") > -1) {
    if (/*@cc_on!@*/false) { // check for Internet Explorer
        document.onfocusin = onActive;
        document.onfocusout = onActive;
    }
    else {
        window.onfocus = onActive;
        window.onblur = onActive;
    }
}
else {
    if (/*@cc_on!@*/false) { // check for Internet Explorer
        document.onfocusin = onFocus;
        document.onfocusout = onBlur;
    }
    else {
        window.onfocus = onFocus;
        window.onblur = onBlur;
    }
}


// displays the LevelControl-Version
var clientLcVersion = new XMLHttpRequest();
clientLcVersion.open('GET', levelControlVersionFile);
clientLcVersion.onreadystatechange = function () {
    if (clientLcVersion.readyState == 4 && clientLcVersion.status == 200) {
        document.getElementById('outerDisplayLcVersionText').innerHTML = "PLC-Version: ";
        document.getElementById('outerDisplayLcVersion').innerHTML = clientLcVersion.responseText;
    }
};
clientLcVersion.send();

// displays the SSI-Version
var clientSsiVersion = new XMLHttpRequest();
clientSsiVersion.open('GET', ssiVersionFile);
clientSsiVersion.onreadystatechange = function () {
    if (clientSsiVersion.readyState == 4 && clientSsiVersion.status == 200) {
        document.getElementById('outerDisplaySSIversionText').innerHTML = "SSI-Version: ";
        document.getElementById('outerDisplaySSIversion').innerHTML = clientSsiVersion.responseText;
    }
};
clientSsiVersion.send();

// displays CAN restart counter
var clientCAN = new XMLHttpRequest();
clientCAN.open('GET', canRestartFile);
clientCAN.onreadystatechange = function () {
    if (clientCAN.readyState == 4 && clientCAN.status == 200) {
        document.getElementById('outerDisplayCAN').innerHTML = clientCAN.responseText;
    }
};
clientCAN.send();

function showHide(name, obj, img) {
    if (document.getElementById(obj).style.display == 'none') {
        document.getElementById(obj).style.display = "";
        document.getElementById(img).src = "img/icon_minus.gif";

        if (name == "Srm1") {
            firmwareCollapsed[0] = false;
            qualityCollapsed[0] = false;
        }
        else if (name == "Srm2") {
            firmwareCollapsed[1] = false;
            qualityCollapsed[1] = false;
        }
        else if (name == "Keypads") {
            keypapdsCollapsed = false;
        }
        else if (name == "LinuxVersion") {
            linuxVersionCollapsed = false;
        }
        else if (name == "MemoryUsage") {
            memoryUsageCollapsed = false;

            loadMemoryUsage();
        }
    }
    else {
        document.getElementById(obj).style.display = "none";
        document.getElementById(img).src = "img/icon_plus.gif";

        if (name == "Srm1") {
            firmwareCollapsed[0] = true;
            qualityCollapsed[0] = true;
        }
        else if (name == "Srm2") {
            firmwareCollapsed[1] = true;
            qualityCollapsed[1] = true;
        }
        else if (name == "Keypads") {
            keypapdsCollapsed = true;
        }
        else if (name == "LinuxVersion") {
            linuxVersionCollapsed = true;
        }
        else if (name == "MemoryUsage") {
            memoryUsageCollapsed = true;
        }
    }
}


function LoadFiles() {
    LoadTextFile(function () {
        LoadType();
        LoadProjectType();
        LoadHostname();
        LoadStartup();
        LoadSoftware();
        LoadHardware();
        LoadNavetteNodes();
        LoadLiftNodes();

        LoadOperatorPanelEnabled();
        loadOperatorPanelName();

        initKeypads();

        LoadSrmStatusFile();

        for (var srmId = 1; srmId <= NUM_OF_SRM; srmId++) {
            LoadSrmName(srmId);
            LoadSrmEnable(srmId);
        }
    });
}

function LoadStartup() {
    var client = new XMLHttpRequest();
    client.open('GET', startupFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;
            var line = "";

            if (response != "") {
                var line = response.split("\n");
                if (line.length > 0) {
                    var tokens = line[line.length - 1].split(" ");

                    if (tokens.length >= 4) {
                        var counter = "";
                        var date = "";
                        var time = "";

                        counter = tokens[0];
                        date = tokens[1];
                        time = tokens[2];

                        document.getElementById('outerDisplayLcVersionStartup').innerHTML = "(" + getWords("lastStartup") + ": " + date + " " + time + ")";
                    }
                }
            }
        }
    };
    client.send();
}

function LoadSoftware() {
    var client = new XMLHttpRequest();
    client.open('GET', softwareFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;
            var line = "";

            if (response != "") {
                document.getElementById('outerDisplayLinuxSwVersion').innerHTML = "Software: <br><br>";

                var line = response.split("\n");
                if (line.length > 0) {
                    for (var i = 0; i < line.length - 1; i++) {
                        var tokens = line[i].split("=");

                        if (tokens.length >= 2) {
                            var name = "";
                            var version = "";

                            name = tokens[0];
                            version = tokens[1];

                            document.getElementById('outerDisplayLinuxSwVersion').innerHTML += name + ": " + version + "<br>";
                        }
                    }
                }
            }
        }
    };
    client.send();
}

function LoadHardware() {
    var client = new XMLHttpRequest();
    client.open('GET', hardwareFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;
            var line = "";

            if (response != "") {
                document.getElementById('outerDisplayLinuxHwVersion').innerHTML = "Hardware: <br><br>";

                var line = response.split("\n");
                if (line.length > 0) {
                    for (var i = 0; i < line.length - 1; i++) {
                        var tokens = line[i].split("=");

                        if (tokens.length >= 2) {
                            var name = "";
                            var version = "";

                            name = tokens[0];
                            version = tokens[1];

                            document.getElementById('outerDisplayLinuxHwVersion').innerHTML += name + ": " + version + "<br>";
                        }
                    }
                }
            }
        }
    };
    client.send();
}

function LoadHostname() {
    var client = new XMLHttpRequest();
    client.open('GET', hostnameFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;

            if (response != "") {
                document.getElementById('LevelControlTable').rows[0].cells[0].innerHTML += " / " + response;
            }
        }
    };
    client.send();
}

function LoadType() {
    var client = new XMLHttpRequest();
    client.open('GET', typeFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;

            if (response != "") {
                document.getElementById('buttonLevelControlErrorsAndWarnings').value = getWords("buttonErrorsAndWarnings");
                document.getElementById('buttonLevelControlStatus').value = getWords("buttonStatus");
                document.getElementById('buttonLevelControlDI').value = getWords("buttonDI");
                document.getElementById('buttonLevelControlDO').value = getWords("buttonDO");
                document.getElementById('buttonSsiLog').value = getWords("buttonLog") + " " + getWords("SSI");
                document.getElementById('buttonService').value = getWords("buttonService");

                document.getElementById('buttonMfsLog').value = getWords("buttonLog") + " " + getWords("MFS") + "/" + getWords("Visu");
                document.getElementById('buttonMfsOrderLog').value = getWords("MFS") + " " + getWords("buttonOrders");
                document.getElementById('buttonMfsReceivedLog').value = getWords("buttonReceivedFrom") + " " + getWords("MFS") + "/" + getWords("Visu");
                document.getElementById('buttonMfsSentLog').value = getWords("buttonSentTo") + " " + getWords("MFS") + "/" + getWords("Visu");

                document.getElementById('buttonSrm1Log').value = getWords("buttonLog") + " " + response;
                document.getElementById('buttonSrm1Received').value = getWords("buttonReceivedFrom") + " " + response;
                document.getElementById('buttonSrm1Sent').value = getWords("buttonSentTo") + " " + response;
                document.getElementById('buttonSrm1ComSendQuality').value = getWords("buttonLog") + " " + getWords("buttonSendQuality");
                document.getElementById('buttonSrm1ErrorsAndWarnings').value = getWords("buttonErrorsAndWarnings");
                document.getElementById('buttonSrm1DriveError').value = getWords("buttonDriveError");
                document.getElementById('buttonSrm1Ohc').value = getWords("buttonOHC");
                document.getElementById('buttonSrm1Status').value = getWords("buttonStatus");
                document.getElementById('buttonSrm1Control').value = getWords("buttonControl");
                document.getElementById('buttonSrm1Orders').value = getWords("buttonOrders");
                document.getElementById('buttonSrm1Releases').value = getWords("buttonReleases");
                document.getElementById('buttonSrm1Di').value = getWords("buttonDI");
                document.getElementById('buttonSrm1Debug').value = getWords("buttonDebug");
                document.getElementById('buttonSrm1TravelDistance').value = getWords("buttonTravelDistance");

                document.getElementById('Srm1ComSendQuality').innerHTML = getWords("SendQuality");

                document.getElementById('Srm1Time').innerHTML = getWords("Time");
                document.getElementById('Srm1Mode').innerHTML = getWords("Mode");
                document.getElementById('Srm1Status').innerHTML = getWords("Status");
                document.getElementById('Srm1StatusX').innerHTML = getWords("StatusX");
                document.getElementById('Srm1StatusY').innerHTML = getWords("StatusY");
                document.getElementById('Srm1SystemStatus1').innerHTML = getWords("SystemStatus1");
                document.getElementById('Srm1SystemStatus2').innerHTML = getWords("SystemStatus2");
                document.getElementById('Srm1SystemStatus3').innerHTML = getWords("SystemStatus3");
                document.getElementById('Srm1SystemStatus4').innerHTML = getWords("SystemStatus4");
                document.getElementById('Srm1Lsd1').innerHTML = getWords("LSD1Status");
                document.getElementById('Srm1Lsd2').innerHTML = getWords("LSD2Status");
                document.getElementById('Srm1ActivePacketID').innerHTML = getWords("active") + " " + getWords("PacketID");
                document.getElementById('Srm1ActiveRequestID').innerHTML = getWords("active") + " " + getWords("RequestID");
                document.getElementById('Srm1BufferedPacketID').innerHTML = getWords("buffered") + " " + getWords("PacketID");
                document.getElementById('Srm1BufferedRequestID').innerHTML = getWords("buffered") + " " + getWords("RequestID");

                document.getElementById('buttonSrm2Log').value = getWords("buttonLog") + " " + response;
                document.getElementById('buttonSrm2Received').value = getWords("buttonReceivedFrom") + " " + response;
                document.getElementById('buttonSrm2Sent').value = getWords("buttonSentTo") + " " + response;
                document.getElementById('buttonSrm2ComSendQuality').value = getWords("buttonLog") + " " + getWords("buttonSendQuality");
                document.getElementById('buttonSrm2ErrorsAndWarnings').value = getWords("buttonErrorsAndWarnings");
                document.getElementById('buttonSrm2DriveError').value = getWords("buttonDriveError");
                document.getElementById('buttonSrm2Ohc').value = getWords("buttonOHC");
                document.getElementById('buttonSrm2Status').value = getWords("buttonStatus");
                document.getElementById('buttonSrm2Control').value = getWords("buttonControl");
                document.getElementById('buttonSrm2Orders').value = getWords("buttonOrders");
                document.getElementById('buttonSrm2Releases').value = getWords("buttonReleases");
                document.getElementById('buttonSrm2Di').value = getWords("buttonDI");
                document.getElementById('buttonSrm2Debug').value = getWords("buttonDebug");
                document.getElementById('buttonSrm2TravelDistance').value = getWords("buttonTravelDistance");

                document.getElementById('Srm2ComSendQuality').innerHTML = getWords("SendQuality");

                document.getElementById('Srm2Time').innerHTML = getWords("Time");
                document.getElementById('Srm2Mode').innerHTML = getWords("Mode");
                document.getElementById('Srm2Status').innerHTML = getWords("Status");
                document.getElementById('Srm2StatusX').innerHTML = getWords("StatusX");
                document.getElementById('Srm2StatusY').innerHTML = getWords("StatusY");
                document.getElementById('Srm2SystemStatus1').innerHTML = getWords("SystemStatus1");
                document.getElementById('Srm2SystemStatus2').innerHTML = getWords("SystemStatus2");
                document.getElementById('Srm2SystemStatus3').innerHTML = getWords("SystemStatus3");
                document.getElementById('Srm2SystemStatus4').innerHTML = getWords("SystemStatus4");
                document.getElementById('Srm2Lsd1').innerHTML = getWords("LSD1Status");
                document.getElementById('Srm2Lsd2').innerHTML = getWords("LSD2Status");
                document.getElementById('Srm2ActivePacketID').innerHTML = getWords("active") + " " + getWords("PacketID");
                document.getElementById('Srm2ActiveRequestID').innerHTML = getWords("active") + " " + getWords("RequestID");
                document.getElementById('Srm2BufferedPacketID').innerHTML = getWords("buffered") + " " + getWords("PacketID");
                document.getElementById('Srm2BufferedRequestID').innerHTML = getWords("buffered") + " " + getWords("RequestID");

                if (response == "Navette") {
                    type = "Navette";

                    document.getElementById('buttonLevelControlLog').value = getWords("buttonLog") + " " + 'LevelControl';

                    document.getElementById('LevelControlTable').rows[0].cells[0].innerHTML = "Level Control";

                    document.getElementById('Srm1Table').rows[0].cells[0].innerHTML = response + " 1";
                    document.getElementById('Srm2Table').rows[0].cells[0].innerHTML = response + " 2";
                }
                else if (response == "Lift") {
                    type = "Lift";

                    document.getElementById('buttonLevelControlLog').value = getWords("buttonLog") + " " + 'LiftControl';

                    document.getElementById('LevelControlTable').rows[0].cells[0].innerHTML = "Lift Control";

                    document.getElementById('Srm1Table').rows[0].cells[0].innerHTML = response;
                    document.getElementById('Srm2Table').style.display = "none";

                    // Remove unused stuff like LSD 2, D2
                    // To get  removed by this, the name of the Element has to be "liftOutline"
                    var elements = document.getElementsByName('liftOutline');
                    for (var d = 0; d < elements.length; d += 1) {
                        elements[d].style.display = "none";
                    }
                    // TODO_DB: Do some Fancy shit with D1, e.g. width:=100%
                    var elements = document.getElementsByName('liftInline');
                    for (var d = 0; d < elements.length; d += 1) {
                        elements[d].colSpan = "2";
                        elements[d].width = "40";
                    }
                }

                loadLevelControlStatus();
            }
        }
    }
    client.send();
}

function LoadProjectType() {
    var client = new XMLHttpRequest();
    client.open('GET', projectTypeFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4) {
            if (client.status == 200) {
                var response = client.responseText;

                if (response != "") {
                    if (response == "G1") {
                        projectType = "G1";
                    }
                    else if (response == "G2") {
                        projectType = "G2";
                    }
                }
            }

            if (projectType == "G1") {
                document.getElementById('buttonSrm1TravelDistance').style.display = 'none';

                document.getElementById('Srm1SystemStatus3').style.display = 'none';
                document.getElementById('Srm1SystemStatus4').style.display = 'none';

                document.getElementById('Srm1W1').style.display = 'none';
                document.getElementById('Srm1W2').style.display = 'none';

                document.getElementById('SystemStatus3_1').style.display = 'none';
                document.getElementById('SystemStatus4_1').style.display = 'none';

                document.getElementById('W1_1').style.display = 'none';
                document.getElementById('W2_1').style.display = 'none';

                document.getElementById('buttonSrm2TravelDistance').style.display = 'none';

                document.getElementById('Srm2SystemStatus3').style.display = 'none';
                document.getElementById('Srm2SystemStatus4').style.display = 'none';

                document.getElementById('Srm2W1').style.display = 'none';
                document.getElementById('Srm2W2').style.display = 'none';

                document.getElementById('SystemStatus3_2').style.display = 'none';
                document.getElementById('SystemStatus4_2').style.display = 'none';

                document.getElementById('W1_2').style.display = 'none';
                document.getElementById('W2_2').style.display = 'none';
            }
        }
    };
    client.send();
}

// Loading SrmStatus file
function LoadNavetteNodes() {
    var client = new XMLHttpRequest();
    client.open('GET', navetteNodesFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;
            var i = 0;
            var state = "";

            if (response != "") {
                response = response.replaceAll("\r", "");

                var line = response.split("\n");

                //skip first line
                for (i = 1; i < line.length; i++) {
                    if (line[i] == 0) {
                        //empty line
                        continue;
                    }

                    var tokens = line[i].split("\t");
                    if (tokens.length < 2) {
                        //too less tokens, need index and text
                        continue;
                    }

                    if (tokens[0] == ""
                        || tokens[1] == "") {
                        continue;
                    }

                    var node = tokens[0];
                    var name = tokens[1];

                    NavetteNodes[node] = name;
                }
            }
        }
    };
    client.send();
}

function LoadLiftNodes() {
    var client = new XMLHttpRequest();
    client.open('GET', liftNodesFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;
            var i = 0;
            var state = "";

            if (response != "") {
                response = response.replaceAll("\r", "");

                var line = response.split("\n");

                //skip first line
                for (i = 1; i < line.length; i++) {
                    if (line[i] == 0) {
                        //empty line
                        continue;
                    }

                    var tokens = line[i].split("\t");
                    if (tokens.length < 2) {
                        //too less tokens, need index and text
                        continue;
                    }

                    if (tokens[0] == ""
                        || tokens[1] == "") {
                        continue;
                    }

                    var node = tokens[0];
                    var name = tokens[1];

                    LiftNodes[node] = name;
                }
            }
        }
    };
    client.send();
}
function loadMemoryUsage() {
    var file = memoryUsageFile + '?t=' + new Date().getTime();

    var client = new XMLHttpRequest();
    client.open('GET', file);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            document.getElementById('outerDisplayMemoryUsage').innerHTML = "";

            var response = client.responseText;

            var line = response.split("\n");
            if (line.length > 0) {
                for (var i = 0; i < line.length; i++) {
                    var tokens = line[i].split("\t");

                    if (tokens.length >= 2) {
                        var name = "";
                        var usage = "";

                        name = tokens[0];
                        usage = tokens[1];

                        document.getElementById('outerDisplayMemoryUsage').innerHTML += name + " " + usage + "%<br>";
                    }
                }
            }
        }
    };
    client.send();
}


// displays LevelControl KeySwitchMode
function loadLevelControlKeySwitch() {
    var filename = levelControlKeySwitchModeFile + '?t=' + new Date().getTime();

    var clientKeyLC = new XMLHttpRequest();
    clientKeyLC.open('GET', filename, true);
    clientKeyLC.onreadystatechange = function () {
        if (clientKeyLC.readyState == 4 && clientKeyLC.status == 200) {
            document.getElementById('keySwitchModeLcText').innerHTML = getWords("KeySwitch") + " (" + getWords("overall") + "): ";

            switch (clientKeyLC.responseText) {
                case "auto":
                    document.getElementById('keySwitchModeLc').innerHTML = getWords("keySwitchAuto");
                    break;
                case "semi":
                    document.getElementById('keySwitchModeLc').innerHTML = getWords("keySwitchSemi");
                    break;
                case "local":
                    document.getElementById('keySwitchModeLc').innerHTML = getWords("keySwitchLocal");
                    break;
                case "undefined":
                    document.getElementById('keySwitchModeLc').innerHTML = getWords("keySwitchUndefined");
                    break;
            }
        }
    };
    clientKeyLC.send();
}


function LoadOperatorPanelEnabled() {
    // displays LevelControl KeySwitchMode
    var clientOperatorPanelEnabled = new XMLHttpRequest();
    clientOperatorPanelEnabled.open('GET', operatorPanelEnabledFile);
    clientOperatorPanelEnabled.onreadystatechange = function () {
        if (clientOperatorPanelEnabled.readyState == 4 && clientOperatorPanelEnabled.status == 200) {
            if (clientOperatorPanelEnabled.responseText == '0') {
                //not enabled
                document.getElementById('OperatorPanelName').style.diplay = "none";
                document.getElementById('OperatorPanelKeySwitchMode').style.diplay = "none";
                operatorPanelEnabled = false;
            }
            else {
                document.getElementById('OperatorPanelName').style.diplay = "";
                document.getElementById('OperatorPanelKeySwitchMode').style.diplay = "";
                operatorPanelEnabled = true;
            }
        }
    };
    clientOperatorPanelEnabled.send();
}

function loadOperatorPanelName() {
    // displays LevelControl KeySwitchMode
    var clientOperatorPanelName = new XMLHttpRequest();
    clientOperatorPanelName.open('GET', operatorPanelNameFile);
    clientOperatorPanelName.onreadystatechange = function () {
        if (clientOperatorPanelName.readyState == 4 && clientOperatorPanelName.status == 200) {
            if (clientOperatorPanelName.responseText != '') {
                document.getElementById('OperatorPanelName').innerHTML = clientOperatorPanelName.responseText + " " + getWords("KeySwitch") + ": ";
            }
            else {
                document.getElementById('OperatorPanelName').innerHTML = getWords("OperatorPanel") + " " + getWords("KeySwitch") + ": ";
            }
        }
    };
    clientOperatorPanelName.send();
}

function loadOperatorPanelKeySwitch() {
    var filename = operatorPanelKeySwitchFile + '?t=' + new Date().getTime();

    var clientOperatorPanelKeySwitch = new XMLHttpRequest();
    clientOperatorPanelKeySwitch.open('GET', filename);
    clientOperatorPanelKeySwitch.onreadystatechange = function () {
        if (clientOperatorPanelKeySwitch.readyState == 4 && clientOperatorPanelKeySwitch.status == 200) {
            switch (clientOperatorPanelKeySwitch.responseText) {
                case "auto":
                    document.getElementById('OperatorPanelKeySwitchMode').innerHTML = getWords("keySwitchAuto");
                    break;
                case "semi":
                    document.getElementById('OperatorPanelKeySwitchMode').innerHTML = getWords("keySwitchSemi");
                    break;
                case "local":
                    document.getElementById('OperatorPanelKeySwitchMode').innerHTML = getWords("keySwitchLocal");
                    break;
                case "undefined":
                    document.getElementById('OperatorPanelKeySwitchMode').innerHTML = getWords("keySwitchUndefined");
                    break;
            }
        }
    };
    clientOperatorPanelKeySwitch.send();
}


function LoadSrmTimeout(srmId) {
    var filename = "Srm" + srmId + srmTimeoutFile + '?t=' + new Date().getTime();

    var client = new XMLHttpRequest();
    client.open('GET', filename);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = "";
            response += client.responseText;

            if (response != "") {
                srmTimeout[srmId - 1] = response;
            }
        }
    };
    client.send();
}

function LoadSrmEnable(srmId) {
    var filename = "Srm" + srmId + srmEnabledFile;

    var client = new XMLHttpRequest();
    client.open('GET', filename);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;

            if (response != "") {
                srmEnabled[srmId - 1] = response;

                if (response == '1') {
                    loadSrmStatus(srmId);
                }
                else {
                    document.getElementById("Srm" + srmId + "Table").style.display = "none";
                }

                LoadReleaseButton();
            }
        }
    };
    client.send();
}

function LoadReleaseButton() {
    if (srmEnabled[0] == "1"
        && srmEnabled[1] == "1") {
        //show 'Releases'-button only if both SRM are enbaled
        document.getElementById('buttonSrm1Releases').style.display = "";
        document.getElementById('buttonSrm2Releases').style.display = "";
        document.getElementById('buttonSsiLog').style.display = "";

        //show SSI-Version
        document.getElementById('SsiTable').style.display = "";
    }
    else {
        //only one SRM enabled -> don't show 'Releases'-button
        document.getElementById('buttonSrm1Releases').style.display = "none";
        document.getElementById('buttonSrm2Releases').style.display = "none";
        document.getElementById('buttonSsiLog').style.display = "none";

        //don't show SSI-Version
        document.getElementById('SsiTable').style.display = "none";
    }
}

function LoadSrmName(srmId) {
    var filename = "Srm" + srmId + srmNameFile;

    var client = new XMLHttpRequest();
    client.open('GET', filename);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;

            if (response != "") {
                document.getElementById('Srm' + srmId + 'Table').rows[0].cells[0].innerHTML += " / " + response;
            }
        }
    };
    client.send();
}

function LoadSrmStatusFile() {
    var client = new XMLHttpRequest();
    client.open('GET', UrlExists(statusBitsFile.replace(".", "_" + languageCode + ".")) ? statusBitsFile.replace(".", "_" + languageCode + ".") : statusBitsFile);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var response = client.responseText;
            var i = 0;
            var state = "";

            if (response != "") {
                response = response.replaceAll("\r", "");

                var line = response.split("\n");

                for (i = 0; i < line.length; i++) {
                    if (line[i] == 0) {
                        //empty line
                        continue;
                    }

                    var tokens = line[i].split("\t");
                    if (tokens.length < 2) {
                        //too less tokens, need index and text
                        continue;
                    }

                    if (tokens[0] == "Mode") state = "Mode";
                    else if (tokens[0] == "SRM Status") state = "SRM Status";
                    else if (tokens[0] == "Status X") state = "Status X";
                    else if (tokens[0] == "Status Y") state = "Status Y";
                    else if (tokens[0] == "System Status1") state = "System Status1";
                    else if (tokens[0] == "System Status2") state = "System Status2";
                    else if (tokens[0] == "System Status3") state = "System Status3";
                    else if (tokens[0] == "System Status4") state = "System Status4";
                    else if (tokens[0] == "Status LSD1") state = "Status LSD1";
                    else if (tokens[0] == "Status LSD2") state = "Status LSD2";
                    else if (tokens[0] == "Info1") state = "Info1";
                    else if (tokens[0] == "Info2") state = "Info2";

                    if (tokens[0] == ""
                        || tokens[1] == "") {
                        continue;
                    }

                    var index = tokens[0];
                    var text = tokens[1];

                    switch (state) {
                        case "Mode": Modes[index] = text; break;
                        case "SRM Status": StatusBits[index] = text; break;
                        case "Status X": StatusXBits[index] = text; break;
                        case "Status Y": StatusYBits[index] = text; break;
                        case "System Status1": SystemStatus1Bits[index] = text; break;
                        case "System Status2": SystemStatus2Bits[index] = text; break;
                        case "System Status3": SystemStatus3Bits[index] = text; break;
                        case "System Status4": SystemStatus4Bits[index] = text; break;
                        case "Status LSD1": StatusLSD1Bits[index] = text; break;
                        case "Status LSD2": StatusLSD2Bits[index] = text; break;
                        case "Info1": Info1Bits[index] = text; break;
                        case "Info2": Info2Bits[index] = text; break;
                        default: break;
                    }
                }
                CreateImages();
            }
        }
    };
    client.send();
}

function CreateImages() {
    for (var srmId = 1; srmId <= NUM_OF_SRM; srmId++) {
        //ganze Zeile vorerst ausblenden -> erst wenn fertig geladen wieder einblenden
        document.getElementById('Srm' + srmId).style.display = "none";

        document.getElementById('Status_' + srmId).innerHTML = "";
        document.getElementById('StatusX_' + srmId).innerHTML = "";
        document.getElementById('StatusY_' + srmId).innerHTML = "";
        document.getElementById('SystemStatus1_' + srmId).innerHTML = "";
        document.getElementById('SystemStatus2_' + srmId).innerHTML = "";
        document.getElementById('SystemStatus3_' + srmId).innerHTML = "";
        document.getElementById('SystemStatus4_' + srmId).innerHTML = "";
        document.getElementById('LSD1_' + srmId).innerHTML = "";
        document.getElementById('LSD2_' + srmId).innerHTML = "";

        for (var i = 0; i < 16; i += 1) {
            if (StatusBits[i] != null) {
                document.getElementById('Status_' + srmId).innerHTML += "<div id=\"Status_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"Status_" + srmId + "_" + i + "_img\"> " + StatusBits[i] + "</img><br/>";
            }
            if (StatusXBits[i] != null) {
                document.getElementById('StatusX_' + srmId).innerHTML += "<div id=\"StatusX_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"StatusX_" + srmId + "_" + i + "_img\"> " + StatusXBits[i] + "</img><br/>";
            }
            if (StatusYBits[i] != null) {
                document.getElementById('StatusY_' + srmId).innerHTML += "<div id=\"StatusY_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"StatusY_" + srmId + "_" + i + "_img\"> " + StatusYBits[i] + "</img><br/>";
            }
        }

        for (var i = 0; i < 8; i += 1) {
            if (SystemStatus1Bits[i] != null) {
                document.getElementById('SystemStatus1_' + srmId).innerHTML += "<div id=\"SystemStatus1_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"SystemStatus1_" + srmId + "_" + i + "_img\"> " + SystemStatus1Bits[i] + "</img><br/>";
            }
            if (SystemStatus2Bits[i] != null) {
                document.getElementById('SystemStatus2_' + srmId).innerHTML += "<div id=\"SystemStatus2_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"SystemStatus2_" + srmId + "_" + i + "_img\"> " + SystemStatus2Bits[i] + "</img><br/>";
            }
            if (SystemStatus3Bits[i] != null) {
                document.getElementById('SystemStatus3_' + srmId).innerHTML += "<div id=\"SystemStatus3_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"SystemStatus3_" + srmId + "_" + i + "_img\"> " + SystemStatus3Bits[i] + "</img><br/>";
            }
            if (SystemStatus4Bits[i] != null) {
                document.getElementById('SystemStatus4_' + srmId).innerHTML += "<div id=\"SystemStatus4_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"SystemStatus4_" + srmId + "_" + i + "_img\"> " + SystemStatus4Bits[i] + "</img><br/>";
            }

            if (StatusLSD1Bits[i] != null) {
                document.getElementById('LSD1_' + srmId).innerHTML += "<div id=\"LSD1_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"LSD1_" + srmId + "_" + i + "_img\"> " + StatusLSD1Bits[i] + "</img><br/>";
            }
            if (StatusLSD2Bits[i] != null) {
                document.getElementById('LSD2_' + srmId).innerHTML += "<div id=\"LSD2_" + srmId + "_" + i + "\"><img src='" + empty + "' id=\"LSD2_" + srmId + "_" + i + "_img\"> " + StatusLSD2Bits[i] + "</img><br/>";
            }
        }
    }
}

function loadSrmKeySwitch(srmId) {
    var filename = "Srm" + srmId + srmKeySwitchModeFile + '?t=' + new Date().getTime();

    // displays Srm* KeySwitchMode
    var clientSrmKey = new XMLHttpRequest();
    clientSrmKey.open('GET', filename);
    clientSrmKey.onreadystatechange = function () {
        if (clientSrmKey.readyState == 4 && clientSrmKey.status == 200) {
            document.getElementById('Srm' + srmId + 'KeySwitchStatusText').innerHTML = getWords("KeySwitch") + ": ";

            switch (clientSrmKey.responseText) {
                case "auto":
                    document.getElementById('Srm' + srmId + 'KeySwitchStatus').innerHTML = getWords("keySwitchAuto");
                    break;
                case "semi":
                    document.getElementById('Srm' + srmId + 'KeySwitchStatus').innerHTML = getWords("keySwitchSemi");
                    break;
                case "local":
                    document.getElementById('Srm' + srmId + 'KeySwitchStatus').innerHTML = getWords("keySwitchLocal");
                    break;
                case "undefined":
                    document.getElementById('Srm' + srmId + 'KeySwitchStatus').innerHTML = getWords("keySwitchUndefined");
                    break;
            }
        }
    };
    clientSrmKey.send();
}

function loadSrmComSendQuality(srmId) {
    var filename = "Srm" + srmId + srmComSendQualityFile + '?t=' + new Date().getTime();

    // displays Srm1 Send-Quality
    var clientSrmSendQuality = new XMLHttpRequest();
    clientSrmSendQuality.open('GET', filename);
    clientSrmSendQuality.onreadystatechange = function () {
        if (clientSrmSendQuality.readyState == 4 && clientSrmSendQuality.status == 200) {
            var response = clientSrmSendQuality.responseText;
            var pos = 0;
            var index = 0;
            var line = "";

            if (response != "") {
                var quality = new Array();
                var x = 0;

                for (var count1 = 0; count1 < 2; count1++) {
                    quality[x] = new Array();
                    var y = 0;

                    line = response.substring(index, response.indexOf("\n", index + 1));
                    index = response.indexOf("\n", index + 1) + 1;

                    if (line == " ") {
                        break;
                    }

                    var i = 0;
                    var j = 0;

                    for (var count2 = 0; count2 < 7; count2++) {
                        j = line.indexOf("\t", i + 1);

                        quality[x][y] = line.substring(i, j);

                        i = j + 1;

                        y += 1;
                    }

                    x += 1;
                }

                document.getElementById('srm' + srmId + 'OuterDisplayQuality').innerHTML = "<table class=\"noBorder\" id=\"srm" + srmId + "OuterDisplayQualityTable\"></table>";
                var qualityTable = document.getElementById('srm' + srmId + 'OuterDisplayQualityTable');

                qualityTable.insertRow(0);
                qualityTable.rows[0].insertCell(0).rowSpan = 2;
                var sendQualityText = qualityTable.rows[0].insertCell(1);
                var sentPackets = qualityTable.rows[0].insertCell(2);

                sendQualityText.colSpan = 3;
                sendQualityText.style.textAlign = "center";
                sendQualityText.innerHTML = getWords("SendQuality");
                sentPackets.colSpan = 3;
                sentPackets.style.textAlign = "center";
                sentPackets.innerHTML = getWords("sentPackets");

                qualityTable.insertRow(1);
                var qualityText = qualityTable.rows[1].insertCell(0);
                var qualityMinText = qualityTable.rows[1].insertCell(1);
                var qualityMaxText = qualityTable.rows[1].insertCell(2);
                var successfulPacketsText = qualityTable.rows[1].insertCell(3);
                var timeoutPacketsText = qualityTable.rows[1].insertCell(4);
                var discardedPacketsText = qualityTable.rows[1].insertCell(5);

                qualityText.innerHTML = "&Oslash; [%]";
                qualityMinText.innerHTML = getWords("min") + " [%]";
                qualityMaxText.innerHTML = getWords("max") + " [%]";
                successfulPacketsText.innerHTML = getWords("successfulPackets");
                timeoutPacketsText.innerHTML = getWords("retriedPackets");
                discardedPacketsText.innerHTML = getWords("discardedPackets");

                //write quality of last minute
                qualityTable.insertRow(2);
                var qualityLastMinute = qualityTable.rows[2].insertCell(0);
                var currQuality = qualityTable.rows[2].insertCell(1);
                var currQualityMin = qualityTable.rows[2].insertCell(2);
                var currQualityMax = qualityTable.rows[2].insertCell(3);
                var currSuccessfulPackets = qualityTable.rows[2].insertCell(4);
                var currTimeoutPackets = qualityTable.rows[2].insertCell(5);
                var currDiscardedPackets = qualityTable.rows[2].insertCell(6);

                qualityLastMinute.innerHTML = getWords("ofLastMinute");
                currQuality.innerHTML = quality[0][0] / QUALITY_FACTOR;
                currQualityMin.innerHTML = quality[0][1] / QUALITY_FACTOR;
                currQualityMax.innerHTML = quality[0][2] / QUALITY_FACTOR;
                currSuccessfulPackets.innerHTML = quality[0][4];
                currTimeoutPackets.innerHTML = quality[0][5];
                currDiscardedPackets.innerHTML = quality[0][6];

                //write quality of last hour
                qualityTable.insertRow(3);
                var qualityLastHour = qualityTable.rows[3].insertCell(0);
                var totalQuality = qualityTable.rows[3].insertCell(1);
                var totalQualityMin = qualityTable.rows[3].insertCell(2);
                var totalQualityMax = qualityTable.rows[3].insertCell(3);
                var totalSuccessfulPackets = qualityTable.rows[3].insertCell(4);
                var totalTimeoutPackets = qualityTable.rows[3].insertCell(5);
                var totalDiscardedPackets = qualityTable.rows[3].insertCell(6);

                qualityLastHour.innerHTML = getWords("ofLastHour");
                totalQuality.innerHTML = quality[1][0] / QUALITY_FACTOR;
                totalQualityMin.innerHTML = quality[1][1] / QUALITY_FACTOR;
                totalQualityMax.innerHTML = quality[1][2] / QUALITY_FACTOR;
                totalSuccessfulPackets.innerHTML = quality[1][4];
                totalTimeoutPackets.innerHTML = quality[1][5];
                totalDiscardedPackets.innerHTML = quality[1][6];
            }
        }
    };
    clientSrmSendQuality.send();
}

function loadSrmFirmware(srmId) {
    var filename = "Srm" + srmId + srmFwFile;

    var clientfw = new XMLHttpRequest();
    clientfw.open('GET', filename);
    clientfw.onreadystatechange = function () {
        if (clientfw.readyState == 4 && clientfw.status == 200) {
            var response = clientfw.responseText;
            var i = 0;
            var j = 0;

            document.getElementById('outerDisplayFirmware' + srmId).innerHTML = "";

            for (var counter = 0; counter < 256; counter++) {
                i = response.indexOf("\n", j);
                var nodeIo = response.substring(j, i);
                j = i + 1;
                i = response.indexOf("\n", j);
                var name = response.substring(j, i);
                j = i + 1;
                i = response.indexOf("\n", j);
                var serialNo = response.substring(j, i);
                j = i + 1;
                i = response.indexOf("\n", j);
                var hwID = response.substring(j, i);
                j = i + 1;
                i = response.indexOf("\n", j);
                var hwVariant = response.substring(j, i);
                j = i + 1;
                i = response.indexOf("\n", j);
                var fwVersion = response.substring(j, i);
                j = i + 1;
                i = response.indexOf("\n", j);
                j = i + 1;

                document.getElementById('outerDisplayFirmware' + srmId).innerHTML += "<table class=\"noBorder\"><tr><td id=\"Name" + srmId + counter + "\" class=\"noBorder\" width='20%'></td><td  id=\"SerialNo" + srmId + counter + "\" class=\"noBorder\" width='20%'></td><td id=\"HwID" + srmId + counter + "\" class=\"noBorder\" width='20%'></td><td id=\"HwVar" + srmId + counter + "\" class=\"noBorder\" width='20%'></td><td id=\"FwVer" + srmId + counter + "\" class=\"noBorder\" width='20%'></td></tr></table>";

                if (type == "Navette") {
                    if (NavetteNodes[nodeIo] != null) {
                        document.getElementById("Name" + srmId + counter).innerHTML = NavetteNodes[nodeIo] + ": ";
                    }
                    else {
                        document.getElementById("Name" + srmId + counter).innerHTML = name + ": ";
                    }
                }
                else if (type == "Lift") {
                    if (LiftNodes[nodeIo] != null) {
                        document.getElementById("Name" + srmId + counter).innerHTML = LiftNodes[nodeIo] + ": ";
                    }
                    else {
                        document.getElementById("Name" + srmId + counter).innerHTML = name + ": ";
                    }
                }

                document.getElementById("SerialNo" + srmId + counter).innerHTML = getWords("SerialNo") + ": " + serialNo;
                document.getElementById("HwID" + srmId + counter).innerHTML = getWords("HW-ID") + ": " + hwID;
                document.getElementById("HwVar" + srmId + counter).innerHTML = getWords("HW-Variant") + ": " + hwVariant;
                document.getElementById("FwVer" + srmId + counter).innerHTML = getWords("FW-Version") + ": " + fwVersion;

                i = response.indexOf("\n", j);
                if (i == -1) {
                    break;
                }
            }
        }
    };
    clientfw.send();
}


// Status of SRM
function loadSrmStatus(srmId) {
    if (!srmEnabled[srmId - 1]) {
        return;
    }

    var filename = "srm" + srmId + srmStatusFile + '?t=' + new Date().getTime();

    var client = new XMLHttpRequest();
    client.open('GET', filename);
    client.onreadystatechange = function () {
        if (client.readyState == 4 && client.status == 200) {
            var text = client.responseText;

            // Splitting last logfile line in separate variables
            var i = text.indexOf("<td>") + 4;
            text = text.substr(i);
            i = 0;

            i = text.indexOf("<td>", i) + 4;

            var time = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td>", i) + 4;

            var packetID = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td>", i) + 4;

            var Mode = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td>", i) + 4;

            var Status = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var StatusX = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var StatusY = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var SystemStatus1 = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var SystemStatus2 = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var SystemStatus3 = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var SystemStatus4 = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var LSD1 = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td>", i) + 4;

            var LSD2 = text.substring(i, text.indexOf("</td>", i)).toDec();
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf("title='", i) + 7;

            var PosX = text.substring(i, text.indexOf("'>", i));
            i = text.indexOf(">", i) + 1;

            var xCoord = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf("title='", i) + 7;

            var PosY = text.substring(i, text.indexOf("'>", i));
            i = text.indexOf(">", i) + 1;

            var yCoord = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            var sCoord = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            var dCoord1 = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            var wCoord1 = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            if (type == "Navette") {
                var dCoord2 = text.substring(i, text.indexOf("</td>", i));
                i = text.indexOf("<td", i) + 3;
                i = text.indexOf(">", i) + 1;

                var wCoord2 = text.substring(i, text.indexOf("</td>", i));
                i = text.indexOf("<td", i) + 3;
                i = text.indexOf(">", i) + 1;
            }

            var activePacketId = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            var activeRequestId = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            var bufferedPacketId = text.substring(i, text.indexOf("</td>", i));
            i = text.indexOf("<td", i) + 3;
            i = text.indexOf(">", i) + 1;

            var bufferedRequestId = text.substring(i, text.indexOf("</td>", i));

            // dissolving Log

            //date/time
            time = time.replace("&nbsp;", "<br><br>");

            //Mode
            //don't filter mode
            //			Mode = Mode.toDec() & 0xF0; // show only general modes (no submodes)
            //			Mode = Mode.toString(16).toUpperCase();

            if (Modes[Mode] != null) {
                document.getElementById('Mode_' + srmId).innerHTML = Modes[Mode];
            }
            else {
                document.getElementById('Mode_' + srmId).innerHTML = "0x" + Mode;
            }

            //Status
            for (var j = 0; j < 16; j += 1) {
                if (StatusBits[j] != null) {
                    if ((Status >> j) & 1) {
                        if (j == 4)		//	4 Warning activ --> warning icon
                            document.getElementById('Status_' + srmId + '_' + j + "_img").src = warning;
                        else if (j == 5)		//	5 In service position --> error icon
                            document.getElementById('Status_' + srmId + '_' + j + "_img").src = error;
                        else
                            document.getElementById('Status_' + srmId + '_' + j + "_img").src = checked;
                    }
                    if (!((Status >> j) & 1))
                        document.getElementById('Status_' + srmId + '_' + j).style.display = "none";
                    else
                        document.getElementById('Status_' + srmId + '_' + j).style.display = "";
                }

                if (StatusXBits[j] != null) {
                    document.getElementById('StatusX_' + srmId + '_' + j + "_img").src = ((StatusX >> j) & 1 ? checked : checked_grey);
                    if (!((StatusX >> j) & 1))
                        document.getElementById('StatusX_' + srmId + '_' + j).style.display = "none";
                    else
                        document.getElementById('StatusX_' + srmId + '_' + j).style.display = "";
                }

                if (StatusYBits[j] != null) {
                    document.getElementById('StatusY_' + srmId + '_' + j + "_img").src = ((StatusY >> j) & 1 ? checked : checked_grey);
                    if (!((StatusY >> j) & 1))
                        document.getElementById('StatusY_' + srmId + '_' + j).style.display = "none";
                    else
                        document.getElementById('StatusY_' + srmId + '_' + j).style.display = "";
                }
            }

            for (var j = 0; j < 8; j += 1) {
                //SystemStatus1
                if (SystemStatus1Bits[j] != null) {
                    if ((SystemStatus1 >> j) & 1) {
                        document.getElementById('SystemStatus1_' + srmId + '_' + j).style.color = "black";
                        if (j == 0 		//	0 Device maintenance access --> warning icon
                            || j == 2)		//	2 Waiting for follow-up --> warning icon
                            document.getElementById('SystemStatus1_' + srmId + '_' + j + "_img").src = warning;
                        else if (j == 6		//	6 Long term blocking --> error icon
                            || j == 7)		//	7 Maintence block --> error icon
                            document.getElementById('SystemStatus1_' + srmId + '_' + j + "_img").src = error;
                        else
                            document.getElementById('SystemStatus1_' + srmId + '_' + j + "_img").src = checked;
                    }
                    if (!((SystemStatus1 >> j) & 1)) {
                        document.getElementById('SystemStatus1_' + srmId + '_' + j).style.color = "grey";
                        if (j == 0 		//	0 Device maintenance access --> warning icon
                            || j == 2)		//	2 Waiting for follow-up order --> warning icon
                            document.getElementById('SystemStatus1_' + srmId + '_' + j + "_img").src = warning_grey;
                        else if (j == 6		//	6 Long term blocking --> error icon
                            || j == 7)		//	7 Maintence block --> error icon
                            document.getElementById('SystemStatus1_' + srmId + '_' + j + "_img").src = error_grey;
                        else
                            document.getElementById('SystemStatus1_' + srmId + '_' + j + "_img").src = checked_grey;
                    }
                }

                //SystemStatus2
                if (SystemStatus2Bits[j] != null) {
                    if ((SystemStatus2 >> j) & 1) {
                        document.getElementById('SystemStatus2_' + srmId + '_' + j).style.color = "black";
                        if (j == 1 		//	1 LSD 1 disabled --> warning icon
                            || j == 2)		//	2 LSD 2 disabled --> warning icon
                            document.getElementById('SystemStatus2_' + srmId + '_' + j + "_img").src = warning;
                        else if (j == 5 		//	5 Fire alarm --> error icon
                            || j == 6 		//	6 Error --> error icon
                            || j == 7)		//	7 Emergency stop --> error icon
                            document.getElementById('SystemStatus2_' + srmId + '_' + j + "_img").src = error;
                        else
                            document.getElementById('SystemStatus2_' + srmId + '_' + j + "_img").src = checked;
                    }
                    if (!((SystemStatus2 >> j) & 1)) {
                        document.getElementById('SystemStatus2_' + srmId + '_' + j).style.color = "grey";
                        if (j == 1 		//	1 LSD 1 disabled --> warning icon
                            || j == 2)		//	2 LSD 2 disabled --> warning icon
                            document.getElementById('SystemStatus2_' + srmId + '_' + j + "_img").src = warning_grey;
                        else if (j == 5		//	5 Fire alarm --> error icon
                            || j == 6		//	6 Error --> error icon
                            || j == 7)		//	7 Emergency stop --> error icon
                            document.getElementById('SystemStatus2_' + srmId + '_' + j + "_img").src = error_grey;
                        else
                            document.getElementById('SystemStatus2_' + srmId + '_' + j + "_img").src = checked_grey;
                    }
                }

                //SystemStatus3
                if (SystemStatus3Bits[j] != null) {
                    if ((SystemStatus3 >> j) & 1) {
                        document.getElementById('SystemStatus3_' + srmId + '_' + j).style.color = "black";
                        document.getElementById('SystemStatus3_' + srmId + '_' + j + "_img").src = checked;
                    }
                    if (!((SystemStatus3 >> j) & 1)) {
                        document.getElementById('SystemStatus3_' + srmId + '_' + j).style.color = "grey";
                        document.getElementById('SystemStatus3_' + srmId + '_' + j + "_img").src = checked_grey;
                    }
                }

                //SystemStatus4
                if (SystemStatus4Bits[j] != null) {
                    if ((SystemStatus4 >> j) & 1) {
                        document.getElementById('SystemStatus4_' + srmId + '_' + j).style.color = "black";
                        document.getElementById('SystemStatus4_' + srmId + '_' + j + "_img").src = checked;
                    }
                    if (!((SystemStatus4 >> j) & 1)) {
                        document.getElementById('SystemStatus4_' + srmId + '_' + j).style.color = "grey";
                        document.getElementById('SystemStatus4_' + srmId + '_' + j + "_img").src = checked_grey;
                    }
                }

                //LSD1
                if (StatusLSD1Bits[j] != null) {
                    document.getElementById('LSD1_' + srmId + '_' + j + "_img").src = ((LSD1 >> j) & 1 ? checked : checked_grey);
                    if (!((LSD1 >> j) & 1))
                        document.getElementById('LSD1_' + srmId + '_' + j).style.color = "grey";
                    else
                        document.getElementById('LSD1_' + srmId + '_' + j).style.color = "black";
                }

                //LSD2
                if (StatusLSD2Bits[j] != null) {
                    document.getElementById('LSD2_' + srmId + '_' + j + "_img").src = ((LSD2 >> j) & 1 ? checked : checked_grey);
                    if (!((LSD2 >> j) & 1))
                        document.getElementById('LSD2_' + srmId + '_' + j).style.color = "grey";
                    else
                        document.getElementById('LSD2_' + srmId + '_' + j).style.color = "black";
                }
            }

            // Output
            document.getElementById('time_' + srmId).innerHTML = time;
            //document.getElementById('PacketID_' + srmId).innerHTML = packetID;
            document.getElementById('X_' + srmId).innerHTML = xCoord;
            document.getElementById('X_' + srmId).title = PosX + " mm";
            document.getElementById('Y_' + srmId).innerHTML = yCoord;
            document.getElementById('Y_' + srmId).title = PosY + " mm";
            switch (sCoord) {
                case '1':
                    document.getElementById('S_' + srmId).innerHTML = getWords("left");
                    break;
                case '2':
                    document.getElementById('S_' + srmId).innerHTML = getWords("right");
                    break;
                default:
                    document.getElementById('S_' + srmId).innerHTML = sCoord;
                    break;
            }
            document.getElementById('D1_' + srmId).innerHTML = dCoord1;
            document.getElementById('W1_' + srmId).innerHTML = wCoord1;

            document.getElementById('D2_' + srmId).innerHTML = dCoord2;
            document.getElementById('W2_' + srmId).innerHTML = wCoord2;

            document.getElementById('ActivePacketID_' + srmId).innerHTML = activePacketId;
            document.getElementById('BufferedPacketID_' + srmId).innerHTML = bufferedPacketId;
            document.getElementById('ActiveRequestID_' + srmId).innerHTML = activeRequestId;
            document.getElementById('BufferedRequestID_' + srmId).innerHTML = bufferedRequestId;

            document.getElementById('Srm' + srmId + 'Table').style.display = '';

            //fertig geladen -> ganze Status-Zeile wieder einblenden
            document.getElementById('Srm' + srmId).style.display = '';
        }
    };
    client.send();


    loadSrmKeySwitch(srmId);

    if (qualityCollapsed[srmId - 1] == false) {
        loadSrmComSendQuality(srmId);
    }

    if (firmwareCollapsed[srmId - 1] == false) {
        loadSrmFirmware(srmId);
    }

    SrmTimeout(srmId);
}

function SrmTimeout(srmId) {
    //get communication timeout flag from file
    LoadSrmTimeout(srmId);

    if (srmTimeout[srmId - 1] == true) {
        SetOrange(srmId);
    }
    else {
        SetWhite(srmId);
    }

    if (document.body.className != 'blurred') {
        setTimeout("loadSrmStatus(" + srmId + ")", 2000);
    }
}


function loadLevelControlStatus() {
    loadLevelControlKeySwitch();

    if (memoryUsageCollapsed == false) {
        loadMemoryUsage();
    }

    if (operatorPanelEnabled == true) {
        loadOperatorPanelKeySwitch();
    }

    if (keypapdsCollapsed == false) {
        loadKeypads();
    }

    LevelControlTimeout();
}

function LevelControlTimeout() {
    if (document.body.className != 'blurred') {
        setTimeout("loadLevelControlStatus()", 5000);
    }
}


// Coloring SrmStatus table on main page;
function SetOrange(num) {
    document.getElementById('Srm' + num).style.backgroundColor = "orange";
}

// Coloring SrmStatus table on main page;
function SetWhite(num) {
    document.getElementById('Srm' + num).style.backgroundColor = "white";
}

function grayOut(vis, options, extra) {
    // Pass true to gray out screen, false to ungray
    // options are optional.  This is a JSON object with the following (optional) properties
    // opacity:0-100         // Lower number = less grayout higher = more of a blackout
    // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
    // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
    // grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
    // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
    // in any order.  Pass only the properties you need to set.
    var options = options || {};
    var zindex = options.zindex || 50;
    var opacity = options.opacity || 30;
    var opaque = (opacity / 100);
    var bgcolor = options.bgcolor || '#000000';
    var dark = document.getElementById('darkenScreenObject');
    if (!dark) {
        // The dark layer doesn't exist, it's never been created.  So we'll
        // create it here and apply some basic styles.
        // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
        var tbody = document.getElementsByTagName("body")[0];
        var tnode = document.createElement('div');           // Create the layer.
        tnode.style.position = 'absolute';                 // Position absolutely
        tnode.style.top = '0px';                           // In the top
        tnode.style.left = '0px';                          // Left corner of the page
        tnode.style.overflow = 'hidden';                   // Try to avoid making scroll bars
        tnode.style.display = 'none';                      // Start out Hidden
        tnode.id = 'darkenScreenObject';                   // Name it so we can find it later

        tbody.appendChild(tnode);                            // Add it to the web page
        dark = document.getElementById('darkenScreenObject');  // Get the object.
    }
    if (vis) {
        // Calculate the page width and height
        if (document.body && (document.body.scrollWidth || document.body.scrollHeight)) {
            var pageWidth = document.body.scrollWidth + 'px';
            var pageHeight = document.body.scrollHeight + 'px';
        }
        else if (document.body.offsetWidth) {
            var pageWidth = document.body.offsetWidth + 'px';
            var pageHeight = document.body.offsetHeight + 'px';
        }
        else {
            var pageWidth = '100%';
            var pageHeight = '100%';
        }
        //set the shader to cover the entire page and make it visible.
        dark.style.opacity = opaque;
        dark.style.MozOpacity = opaque;
        dark.style.filter = 'alpha(opacity=' + opacity + ')';
        dark.style.zIndex = zindex;
        dark.style.backgroundColor = bgcolor;
        dark.style.width = pageWidth;
        dark.style.height = pageHeight;
        dark.style.display = 'block';
        if (extra == 'Y')
            document.body.style.overflow = 'hidden';

    }
    else {
        dark.style.display = 'none';
    }
}


