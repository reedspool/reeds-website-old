// @ts-ignore: Included for its activation on HTML page.
// TODO Can't get hyperscript to work, so I'm just including it literally via CDN
// import * as hyperscript from 'hyperscript.org';
// @ts-ignore: Included for its activation on HTML page.
import 'htmx.org';

// Literally including the json-enc htmx extension source because it's simple
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener(
        "htmx:load",
        function () {
            // TODO: For some reason `htmx` from the import isn't correct, but
            // window.htmx is correct. This is confused by the fact that htmx won't
            // load at all in the JS unless the variable `htmx` is referenced
            // @ts-ignore Can't figure out how to use window.d.ts in this setup :-/
            window.htmx.defineExtension('json-enc', {
                onEvent: function (name: string, evt: { detail: { headers: { 'Content-Type': string } } }) {
                    if (name === "htmx:configRequest") {
                        evt.detail.headers['Content-Type'] = "application/json";
                    }
                },

                encodeParameters: function (xhr: XMLHttpRequest, parameters: {}, _elt: Element) {
                    xhr.overrideMimeType('text/json');
                    return (JSON.stringify(parameters));
                }
            });
        });
});
