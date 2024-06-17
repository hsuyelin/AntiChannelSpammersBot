import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { log } from './misc.js';
import { admin, bot } from '../../index.js';

const template = {
    del: false,
    delCmd: false,
    delAnonMsg: false,
    delLinkChanMsg: false,
    unpinChanMsg: false,
    whitelist: {}
};

let chatsList = {};

class Data {
    static save() {
        if (!existsSync('./data')) {
            mkdirSync('./data');
        }
        writeFileSync('./data/chatsList.json', JSON.stringify(chatsList, null, 2));
        log('数据已保存');
    }

    static load() {
        try {
            if (existsSync('./data/chatsList.json')) {
                Object.assign(chatsList, JSON.parse(readFileSync('./data/chatsList.json', 'utf-8')));
                log('加载数据成功');
            } else {
                log('未发现数据文件，已创建空数据');
                this.save();
            }
        } catch (err) {
            log(`未发现数据或恢复失败，已重新创建数据，报错信息：${err.message}`);
            this.save();
        }
    }

    static backup() {
        bot.telegram.sendDocument(admin, { source: './data/chatsList.json' }, {
            caption: '#backup',
            disable_notification: true
        }).catch((e) => {
            log(`备份失败: ${e.message}`, true);
            bot.telegram.sendMessage(admin, '备份失败:' + e.message).catch(() => null);
        });
    }

    static checkChat(chatId) {
        if (typeof chatsList[chatId] === 'undefined') {
            chatsList[chatId] = deepClone(template);
        } else {
            for (let key in template) {
                if (typeof chatsList[chatId][key] === 'undefined') {
                    chatsList[chatId][key] = deepClone(template[key]);
                }
            }
        }
    }
}

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (obj instanceof Date) {
        const copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }

    if (obj instanceof Function) {
        return function() {
            return obj.apply(this, arguments);
        };
    }

    if (obj instanceof Object) {
        const copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepClone(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error(`Unable to copy obj as type isn't supported ${obj.constructor.name}`);
}

export default Data;
export { template, chatsList };
