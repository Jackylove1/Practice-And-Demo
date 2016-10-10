/**
 * Created by Fire on 2016/10/6.
 */

function BaseCompontent(htmlStr) {
    this.elem = undefined;

    htmlStr = $$.trim(htmlStr);

    if(typeof htmlStr === 'string' && /^</.test(htmlStr)) {
        this.elem = $$(htmlStr);
    }
}