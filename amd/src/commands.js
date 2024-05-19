// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Commands helper for the Moodle tiny_extention plugin.
 *
 * @module      plugintype_pluginname/commands
 * @copyright   2024 Aniket Kumar <aniketkj9211@gmail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import { getButtonImage } from "editor_tiny/utils";
// import {get_string as getString} from 'core/str';
// import Config from "core/config";
import { component, icon, buttonName } from "./common";
import { init } from "./chem";

/**
 * Handle the action for your plugin.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 */

// const handleAction = (editor) => {
//   // TODO Handle the action.
//   document.addEventListener('DOMContentLoaded', function () {
//     init()
//   });
// };

const handleAction = () => {
  if (document.readyState === 'complete') {
      // If the document is already completely loaded, call init directly.
      init();
  } else {
      // Otherwise, wait for the DOMContentLoaded event.
      document.addEventListener('DOMContentLoaded', init);
  }
};


/**
 * Get the setup function for the buttons.
 *
 * This is performed in an async function which ultimately returns the registration function as the
 * Tiny.AddOnManager.Add() function does not support async functions.
 *
 * @returns {function} The registration function to call within the Plugin.add function.
 */
export const getSetup = async () => {
  const buttonImage = await getButtonImage("icon", component);

  return (editor) => {
    // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
    editor.ui.registry.addIcon(icon, buttonImage.html);

    // Add a button to the toolbar
    editor.ui.registry.addButton(buttonName, {
      tooltip: buttonName,
      icon: icon,
      onAction: () => handleAction(editor),
    });

    // Add an item to the menubar
    editor.ui.registry.addMenuItem(buttonName, {
      icon,
      text: buttonName,
      context: "tools",
      onAction: () => handleAction(editor),
    });
  };
};
