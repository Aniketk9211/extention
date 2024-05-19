// Import necessary Moodle frontend modules
// import { get_string as getString } from "core/str";
// import Templates from "core/templates";
// import { exception as displayException } from "core/notification";
// import Modal from "core/modal";
// import Config from "core/config";

/**
 * Initializes and displays a modal.
 */

async function init() {
  try {
    console.log("Inside app.js")
    // Dynamically load ChemDoodle scripts and styles
    await loadChemDoodleComponents();

    // Initialize the ChemDoodle sketcher after the modal is displayed

    await initializeChemDoodle();

  } catch (error) {
    console.error("Error displaying modal:", error);
  }
}

async function initializeChemDoodle() {
    ChemDoodle.ELEMENT['H'].jmolColor = 'black';
    ChemDoodle.ELEMENT['S'].jmolColor = '#B9A130';
    var sketcher = new ChemDoodle.SketcherCanvas('chemdoodle-sketcher', 500, 300,{useServices:true});
    sketcher.styles.atoms_displayTerminalCarbonLabels_2D = true;
    sketcher.styles.atoms_useJMOLColors = true;
    sketcher.styles.bonds_clearOverlaps_2D = true;
    sketcher.styles.shapes_color = '#c10000';
    sketcher.repaint();
  // sketcher.resize();
  sketcher.repaint();
  console.log("ChemDoodle initialized.");
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${url}"]`)) {
      console.log(`Script already loaded: ${url}`);
      resolve();
      return;
    }

    // If not loaded, create a new script element
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = () => {
      console.log(`Successfully loaded: ${url}`);
      resolve();
    };
    script.onerror = () => {
      console.error(`Failed to load script: ${url}`);
      reject(new Error(`Failed to load script: ${url}`));
    };
    document.head.appendChild(script);
  });
}

function loadCSS(url) {
  return new Promise((resolve, reject) => {
    // Check if the CSS is already loaded
    if (document.querySelector(`link[href="${url}"]`)) {
      console.log(`Stylesheet already loaded: ${url}`);
      resolve();
      return;
    }

    // If not loaded, create a new link element
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => {
        console.log(`Successfully loaded: ${url}`);
        resolve();
      };
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

async function loadChemDoodleComponents() {
  try {
    const baseUrl = `../ChemDoodle/install/`;

    // Load core ChemDoodle Web components
    await loadCSS(`${baseUrl}ChemDoodleWeb.css`);
    await loadCSS(`${baseUrl}uis/jquery-ui-1.11.4.css`);
    
    // Load additional UI components
    await loadScript(`${baseUrl}ChemDoodleWeb.js`);
    await loadScript(`${baseUrl}uis/ChemDoodleWeb-uis.js`);

    console.log("All ChemDoodle components loaded successfully");
  } catch (error) {
    console.error("Failed to load ChemDoodle components:", error);
  }
}

init();
