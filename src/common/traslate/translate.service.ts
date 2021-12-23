import { Injectable } from "@nestjs/common";
import { locale as esLang } from '../../i18n/es';
@Injectable()
export class TranslateService {
    private TRANSLATES: any = {}
    constructor(){
        this.loadTranslations(esLang);
    }
    loadTranslations(...args: any[]):void{
        const locales = [...args];
        locales.forEach( locale => {
            this.TRANSLATES[locale.lang] = locale.data;
        });
    }
    get(lang, key) {
        const paths = key.split('.');
        if( !this.TRANSLATES[lang] ){
            return this.get('en', key);
        }
        let traduction = this.TRANSLATES[lang];
        for( let i = 0; i < paths.length; i++ ){
            traduction = traduction[paths[i]];
            if( traduction == undefined ){
                break;
            }
        }
        if( !traduction && lang != 'es' ){
            return this.get('es', key);
        } else {
            return traduction;
        }
    }
}