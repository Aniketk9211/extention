// Import necessary Moodle frontend modules
// import { get_string as getString } from "core/str";
// import Templates from "core/templates";
// import { exception as displayException } from "core/notification";
import Modal from "core/modal";
import Config from "core/config";

/**
 * Initializes and displays a modal.
 */

async function init() {
  try {
    // const title = await getString('buttonNameTitle', 'tiny_keteditor');
    const title = "ChemDoodle Sketcher";
    const modal = await Modal.create({
      title: title,
      show: true,
      removeOnClose: true,
    });

    // ChemDoodle container HTML
    const chemDoodleHtml = `
            <div id="chemdoodle-sketcher" style="width:800px; height:400px;">Moodle Skether Place</div>
        `;

    // Append the ChemDoodle container to the modal's body
    modal.setBody(chemDoodleHtml);

    // Dynamically load ChemDoodle scripts and styles
    await loadChemDoodleComponents();

    // Initialize the ChemDoodle sketcher after the modal is displayed
    modal.getRoot().on("shown", () => {
      initializeChemDoodle();
    });

    modal.show();
  } catch (error) {
    console.error("Error displaying modal:", error);
  }
}

async function initializeChemDoodle() {
  const sketcher = new ChemDoodle.SketcherCanvas(
    "chemdoodle-sketcher",
    800,
    400,
    {
      useServices: false,
      oneMolecule: true,
      isMobile: false,
    }
  );
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
    // document.body.appendChild(script);
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
    link.type = "text/css";
    link.onload = () => {
      console.log(`Successfully loaded: ${url}`);
      resolve();
    };
    link.onerror = () => {
      console.error(`Failed to load CSS: ${url}`);
      reject(new Error(`Failed to load CSS: ${url}`));
    };
    // document.head.appendChild(link);
  });
}

async function loadChemDoodleComponents() {
  try {
    const baseUrl = `${Config.wwwroot}/lib/editor/tiny/plugins/extention/ChemDoodleWeb/install/`;

    // Load core ChemDoodle Web components
    await loadCSS(`${baseUrl}ChemDoodleWeb.css`);
    await loadScript(`${baseUrl}ChemDoodleWeb.js`);

    // Load additional UI components
    await loadCSS(`${baseUrl}uis/jquery-ui-1.11.4.css`);
    await loadScript(`${baseUrl}uis/ChemDoodleWeb-uis.js`);

    console.log("All ChemDoodle components loaded successfully");
  } catch (error) {
    console.error("Failed to load ChemDoodle components:", error);
  }
}

export { init };
