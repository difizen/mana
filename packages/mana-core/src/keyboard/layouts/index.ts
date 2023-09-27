import type { KeyboardLayoutData } from '../browser-keyboard-layout-provider';

import cs_Czech_mac from './cs-Czech-mac';
import cs_Czech_pc from './cs-Czech-pc';
import da_Danish_mac from './da-Danish-mac';
import da_Danish_pc from './da-Danish-pc';
import de_German_mac from './de-German-mac';
import de_German_pc from './de-German-pc';
import de_Swiss_German_mac from './de-Swiss_German-mac';
import de_Swiss_German_pc from './de-Swiss_German-pc';
import en_British_mac from './en-British-mac';
import en_British_pc from './en-British-pc';
import en_Colemak_mac from './en-Colemak-mac';
import en_Dvorak_mac from './en-Dvorak-mac';
import en_Dvorak_pc from './en-Dvorak-pc';
import en_Dvorak_Lefthanded_mac from './en-Dvorak_Lefthanded-mac';
import en_Dvorak_Lefthanded_pc from './en-Dvorak_Lefthanded-pc';
import en_Dvorak_Righthanded_mac from './en-Dvorak_Righthanded-mac';
import en_Dvorak_Righthanded_pc from './en-Dvorak_Righthanded-pc';
import en_US_mac from './en-US-mac';
import en_US_pc from './en-US-pc';
import es_Spanish_mac from './es-Spanish-mac';
import es_Spanish_pc from './es-Spanish-pc';
import fr_Bepo_pc from './fr-Bepo-pc';
import fr_Canadian_French_mac from './fr-Canadian_French-mac';
import fr_Canadian_French_pc from './fr-Canadian_French-pc';
import fr_French_mac from './fr-French-mac';
import fr_French_pc from './fr-French-pc';
import fr_Swiss_French_mac from './fr-Swiss_French-mac';
import fr_Swiss_French_pc from './fr-Swiss_French-pc';
import hu_Hungarian_mac from './hu-Hungarian-mac';
import hu_Hungarian_pc from './hu-Hungarian-pc';
import it_Italian_mac from './it-Italian-mac';
import it_Italian_pc from './it-Italian-pc';
import nb_Norwegian_mac from './nb-Norwegian-mac';
import nb_Norwegian_pc from './nb-Norwegian-pc';
import nl_Dutch_mac from './nl-Dutch-mac';
import nl_Dutch_pc from './nl-Dutch-pc';
import pl_Polish_mac from './pl-Polish-mac';
import pl_Polish_pc from './pl-Polish-pc';
import pt_Brazilian_mac from './pt-Brazilian-mac';
import pt_Portuguese_mac from './pt-Portuguese-mac';
import pt_Portuguese_pc from './pt-Portuguese-pc';
import ro_Romanian_mac from './ro-Romanian-mac';
import ro_Romanian_pc from './ro-Romanian-pc';
import sv_Swedish_mac from './sv-Swedish-mac';
import sv_Swedish_pc from './sv-Swedish-pc';
import tr_Turkish_Q_mac from './tr-Turkish_Q-mac';
import tr_Turkish_Q_pc from './tr-Turkish_Q-pc';

const layoutRawData: Record<string, any> = {
  'en-US-pc': en_US_pc,
  'en-US-mac': en_US_mac,
  'en-Dvorak-pc': en_Dvorak_pc,
  'en-Dvorak-mac': en_Dvorak_mac,
  'en-Dvorak_Lefthanded-pc': en_Dvorak_Lefthanded_pc,
  'en-Dvorak_Lefthanded-mac': en_Dvorak_Lefthanded_mac,
  'en-Dvorak_Righthanded-pc': en_Dvorak_Righthanded_pc,
  'en-Dvorak_Righthanded-mac': en_Dvorak_Righthanded_mac,
  'en-Colemak-mac': en_Colemak_mac,
  'en-British-pc': en_British_pc,
  'en-British-mac': en_British_mac,
  'de-German-pc': de_German_pc,
  'de-German-mac': de_German_mac,
  'de-Swiss_German-pc': de_Swiss_German_pc,
  'de-Swiss_German-mac': de_Swiss_German_mac,
  'fr-French-pc': fr_French_pc,
  'fr-French-mac': fr_French_mac,
  'fr-Canadian_French-pc': fr_Canadian_French_pc,
  'fr-Canadian_French-mac': fr_Canadian_French_mac,
  'fr-Swiss_French-pc': fr_Swiss_French_pc,
  'fr-Swiss_French-mac': fr_Swiss_French_mac,
  'fr-Bepo-pc': fr_Bepo_pc,
  'pt-Portuguese-pc': pt_Portuguese_pc,
  'pt-Portuguese-mac': pt_Portuguese_mac,
  'pt-Brazilian-mac': pt_Brazilian_mac,
  'pl-Polish-pc': pl_Polish_pc,
  'pl-Polish-mac': pl_Polish_mac,
  'nl-Dutch-pc': nl_Dutch_pc,
  'nl-Dutch-mac': nl_Dutch_mac,
  'es-Spanish-pc': es_Spanish_pc,
  'es-Spanish-mac': es_Spanish_mac,
  'it-Italian-pc': it_Italian_pc,
  'it-Italian-mac': it_Italian_mac,
  'sv-Swedish-pc': sv_Swedish_pc,
  'sv-Swedish-mac': sv_Swedish_mac,
  'tr-Turkish_Q-pc': tr_Turkish_Q_pc,
  'tr-Turkish_Q-mac': tr_Turkish_Q_mac,
  'cs-Czech-pc': cs_Czech_pc,
  'cs-Czech-mac': cs_Czech_mac,
  'ro-Romanian-pc': ro_Romanian_pc,
  'ro-Romanian-mac': ro_Romanian_mac,
  'da-Danish-pc': da_Danish_pc,
  'da-Danish-mac': da_Danish_mac,
  'nb-Norwegian-pc': nb_Norwegian_pc,
  'nb-Norwegian-mac': nb_Norwegian_mac,
  'hu-Hungarian-pc': hu_Hungarian_pc,
  'hu-Hungarian-mac': hu_Hungarian_mac,
};

/**
 * Keyboard layout files are expected to have the following name scheme:
 *     `language-name-hardware.json`
 *
 * - `language`: A language subtag according to IETF BCP 47
 * - `name`:     Display name of the keyboard layout (without dashes)
 * - `hardware`: `pc` or `mac`
 */
function loadLayout(fileName: string, raw: any): KeyboardLayoutData {
  const [language, name, hardware] = fileName.split('-');
  return {
    name: name.replace('_', ' '),
    hardware: hardware as 'pc' | 'mac',
    language,
    // Webpack knows what to do here and it should bundle all files under `../../../src/common/keyboard/layouts/`
    raw,
  };
}

export function loadAllLayouts(): KeyboardLayoutData[] {
  // The order of keyboard layouts is relevant for autodetection. Layouts with
  // lower index have a higher chance of being selected.
  // The current ordering approach is to sort by estimated number of developers
  // in the respective country (taken from the Stack Overflow Developer Survey),
  // but keeping all layouts of the same language together.
  const keys = Object.keys(layoutRawData);
  return keys.map(key => loadLayout(key, layoutRawData[key]));
}
