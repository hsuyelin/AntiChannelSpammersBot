import { fmt, bold, link, code } from 'telegraf/format';

const strings = {
    analyzing: '正在统计...',
    stats: ({
        joinedGroups,
        joinedMembers,
        enabledGroups,
        enabledMembers
    }) => fmt`${bold('🎉 统计信息')}\n加入的群组：${joinedGroups} 个\n成员数：${joinedMembers} 人\n启用的群组：${enabledGroups} 个\n成员数：${enabledMembers} 人`,
    welcome_private: fmt`${bold('欢迎使用 🎉')}欢迎使用\n\n我可以：\n- 删除群成员以频道身份发送的消息\n- 删除匿名群管理的消息\n- 删除来自关联频道的消息\n- 解除频道消息在群内的置顶\n\n点击下面的按钮，将我添加至群组。\n\n源代码：${link('GitHub', 'https://github.com/AnotiaWang/AntiChannelSpammersBot')}`,
    welcome_group: '欢迎使用！您可以发送 /on 或 /off 一键开启/关闭反马甲。发送 /config 进行详细的设置，更多用法详见 /help。',
    add_to_group: '点此将我添加到群组',
    group_only: '请在群组中使用。',
    del_channel_message_on: '已在本群启用自动删除频道马甲发送的消息。\n\n您需要将我设置为管理员，并授予删除消息的权限。您可以发送 /config 查看相关设置，发送 /help 查看功能帮助。',
    del_channel_message_off: '已停止自动删除频道马甲发送的消息。',
    operator_not_admin: (id) => fmt`${link('您', `tg://user?id=${id}`)}不是群主或管理员。`,
    help: fmt`${bold('🤖 使用帮助')}\n\n${bold(' - /on | /off')}: 启用 / 关闭自动删除\n\n${bold(' - /ban | /unban')}: 封禁/解封马甲。被封禁后，对方无法使用任何马甲在本群发言。您也可以在群组设置里解封频道。\n\n${bold(' - /promote | /demote')}: 将频道加入/移出白名单。支持将频道 UID (${code('-10012345678')}) / username (${code('@YuanShen')}) 作为参数，也可以回复一条消息来操作。\n\n${bold(' - /config')}: 显示此群组的设置：\n    - 开关 “删除频道马甲的消息”；\n    - 开关 “删除群管匿名发送的消息”；\n    - 开关 “删除来自关联频道的消息”；\n    - 开关 “解除频道消息在群内置顶”；\n    - 开关 “自动清理命令”；\n    - 查看和编辑白名单。\n\n本机器人基于 GPLv3 协议开源，源码发布于 ${link('GitHub', 'https://github.com/AnotiaWang/AntiChannelSpammersBot')}。`,
    x_added_to_whitelist: (x, id) => fmt`已将 "${x}" (${code(id)}) 添加到白名单。`,
    x_removed_from_whitelist: (x, id) => fmt`已将 "${x}" (${id}) 从白名单中移除。`,
    x_already_in_whitelist: '该频道已在白名单中。',
    x_not_in_whitelist: '该频道不在白名单中。',
    x_not_a_channel: '目标不是频道，无法操作。',
    get_channel_error: (reason) => fmt`查询失败：指定目标不是频道或不存在，请检查您的格式。请以频道 UID(如 ${code('-10012345678')}) 或 username(@xxxx，仅公开频道拥有) 作为命令参数。\n${reason}`,
    command_usage_error: fmt`请回复一条消息，或者使用 ${code('[频道 UID/username]')} 作为命令参数。`,
    whitelist_help: fmt`${bold('📃 白名单')}\n\n点击按钮取消对应频道的授权。`,
    query_sender_not_admin: '您不是群主或管理员，再点我要摇人啦！\n\nPS：如果没有管理员权限，我可能无法获取群内成员权限组。',
    reply_to_query: '请回复一条来自频道马甲的消息。',
    ban_sender_chat_success: (id) => fmt`已封禁频道 ${code(id)}，其所有者将无法在本群使用任何频道马甲。`,
    unban_sender_chat_success: (id) => fmt`已解封频道 ${code(id)}。`,
    permission_error: (x) => `${x}失败，请检查您是否授予了我相应的权限，以及群内是否有提供类似功能的机器人。`,
    deleteMsgFailure: (id, err) => `尝试删除消息 (ID ${id}) 失败！错误信息：${err}\n\n可能的原因：\n1. 我没有删除消息的权限；\n2. 目标消息已经发出超过 48 小时。(此消息 15 秒后删除)`,
    deleteMsg: '删除此消息',
    settings: fmt`${bold('⚙️ 设置')}`,
    ban_sender_chat: '封禁频道马甲',
    unban_sender_chat: '解封频道马甲',
    unpin_message: '解除消息置顶',
    settings_saved: '设置成功',
    pin_permission_needed: '请确保您已经授予我置顶消息的权限。',
    exit_confirm: fmt`请发送 ${code('/exit Yes|Y')} 确认退出`,
    save_success: '保存成功',
    deleteCommandHelp: '设置成功，我会在命令消息发出 10 秒后尝试删除。',
    deleteChannelSenderMsg: '删除频道马甲消息',
    deleteAnonymousAdminMsg: '删除匿名管理消息',
    deleteLinkedChannelMsg: '删除来自关联频道的消息',
    unpinChannelMsg: '解除频道消息在群内置顶',
    deleteCommand: '自动清理命令',
    channelWhitelist: '频道马甲白名单'
};

export default strings;
