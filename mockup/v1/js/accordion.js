/**
 * Author: m.corallo
 * 
 * funzioni javascript per l'accordion
 * utilizza jquery
 */

function accordionTitleClick(component) {
	$('#' + component.id).next('div:hidden').slideToggle('fast').siblings('div').slideUp('fast');
}
