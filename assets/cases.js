import { pick, shuffleInPlace } from './app.js';

/**
 * 剧本目录：只做“主题/时代/气质”展示。
 * 具体案件在 game.html 里用生成器按 seed 生成（同剧本也会变化）。
 */
export const SCRIPT_CATALOG = [
  {
    id: 'rose_manor',
    title: '雾锁蔷薇庄园',
    tagline: '雷雨洗礁岸，密室吞回声；一枚纽扣拒不认领主人',
    genre: '民国悬疑',
    era: '1930s',
    suspectCount: 4,
    description:
      '胶东临海的一座庄园在暴风雨夜与世隔绝：灯火摇晃如残烛，海浪替凶手掩盖足音。东家死于反锁书房，体面得像一桩自杀寓言，掌心却攥着枚不属于任何人的纽扣——它不是线索，而是一封写给侦探的挑战书。夜宵托盘在长廊尽头拐弯，抽屉底层藏着裁纸刀的籍贯；四名各怀血缘与账目之人等待讯问，谁在烟火灶台前佝偻惯了说谎的姿态？这不是密室诡计展演，而是一阙民国末世里关于阶级、要挟与忍辱的悲剧合唱。'
  },
  {
    id: 'island_hotel',
    title: '孤岛旅馆的回声',
    tagline: '雾锁航线，电流归零；留声机却在无人走廊复诵旧债',
    genre: '孤岛风暴',
    era: '现代',
    suspectCount: 5,
    description:
      '海雾升起如帷幕，旅馆像一艘搁浅的老船：断电的瞬间，所有人的面孔都被抹去轮廓，只剩配电室里一具体温尚未散尽的身躯。一串陌生钥匙圈躺在死者指边，仿佛嘲笑每位旅客都曾觊觎那扇门后的捷径。风暴是最公允的陪审团——它迫使你们在烛光与猜忌中共诉往事：谁在停电前后触碰过命运的配电闸？本作要写孤岛寓言里的人性潮汐，不靠天外救兵，只靠你把回声翻译成动机。'
  },
  {
    id: 'highspeed_train',
    title: '夜行高铁 · 终点未明',
    tagline: '隧道吞咽灯火；一节车厢藏得下整座城的时差',
    genre: '封闭空间',
    era: '现代',
    suspectCount: 4,
    description:
      '钢铁长龙驶入漫长的黑暗——六十秒的失明足以重写供述。有人在密闭洗手间永远缺席，广播杂音像掐断的辩解，一张陈旧车票蜷在掌心，字迹褪得像刻意模糊的籍贯。你们是移动的陪审席：乘务员的手册、邻座的睡意、过道监控的盲点，全都可能成为凶手的共谋。此案逼迫你在时速三百公里的冷酷秩序里辨认野蛮：谁能证明自己在黑暗中未曾伸手？封闭空间从来不靠噱头吓人，它惩罚每一个疏忽细节的旁观者。'
  },
  {
    id: 'old_town',
    title: '旧城钟声',
    tagline: '钟舌停摆之夜，遗嘱缺席；玻璃茬口锋利得像誓言',
    genre: '都市推理',
    era: '现代',
    suspectCount: 4,
    description:
      '拆迁倒计时嘀嗒作响，旧城钟楼却在零点失声——宛如一座城市自愿缄默。钟室里躺着不肯腐朽的尸体，遗嘱像幽灵蒸发，玻璃碎片折射出昔日街坊今日的投机者面孔。这里没有侠客巡街，只有丈量土地的人与丈量良心的人在阴影里擦肩而过。你将拆解钟声背后的账本：谁在停摆前后握着能上锁的唯一钥匙？这不仅是一次谋杀复盘，更是对一代城市记忆的葬礼致辞——真相或许苦涩，却比废墟更值得安葬。'
  },
  {
    id: 'opera_house',
    title: '戏台落幕后',
    tagline: '脸谱卸妆之前，胭脂匣先尝到了铁锈味',
    genre: '民国悬疑',
    era: '1930s',
    suspectCount: 5,
    description:
      '满堂喝彩尚未散尽，后台已将锣鼓换成喘息——掌班倒在妆奁与胭脂之间，暗门半启如咧开的嘴角。台上唱的是忠义千秋，台下藏的却是拖欠、羞辱与见不得光的契约；每名伶人与伙计都有一双手既能点水袖也能握住绳索。此案要写「戏假情真」四字背面：谁在唱腔停顿的瞬间穿行后台？谁在卸妆油彩之下仍戴着另一张脸？你将用民国戏班的礼法与潜规则对位现代推理——让血色与唱腔同板同眼。'
  },
  {
    id: 'mountain_inn',
    title: '雪夜山栈',
    tagline: '暴雪封喉，炉火自戕；脚印在门前向虚空道歉',
    genre: '孤岛风暴',
    era: '现代',
    suspectCount: 5,
    description:
      '山路被大雪轻轻拧断，山栈取暖的炉火像被谁悄悄掐灭——寒冷成为共犯。死者蜷缩在储藏间，门外雪地上足迹走到一半便向命运缴械投降。住客各自携带着城市无法审判的秘密：旧情、赌债、血缘、不可告人的同行。暴风雪抹去世界的细节，却把人的呼吸放大成证词。这不是童谣式的暴风雪山庄模板，而是一首低温叙事诗——谁在供热管道与补给名单之间埋下第二个心跳？等你揭开谜底时，雪夜里会有人听见骨头解冻的声音。'
  },
  {
    id: 'museum_night',
    title: '博物馆之夜 · 空柜',
    tagline: '警报缄默如祭司；玻璃无尘，反倒像在认罪',
    genre: '都市推理',
    era: '现代',
    suspectCount: 5,
    description:
      '闭馆铃声落下后，文明被装进冷藏的灯光——镇馆之宝凭空蒸发，警报却在所有人的记忆里失声。玻璃洁净得像嘲笑指纹神话，策展人与保全系统的对峙宛如宗教裁判。谁在恒温走廊拥有第二种视力：看得见红外线之外的野心？本作熔铸都市寓言：赃物从来不只是器物，它也是话语权与合法性本身。你将穿行展厅叙事与社会隐喻的双重迷宫——直到那只无形之手被迫从史诗展品背后伸出，承认自己同样可被编号与封存。'
  },
  {
    id: 'river_town',
    title: '江南雨巷',
    tagline: '雨脚缝针，药香裹尸；泡软的旧信不肯沉没',
    genre: '民国悬疑',
    era: '1920s',
    suspectCount: 5,
    description:
      '梅雨把青石巷子磨成镜面——水面之下却是江南百年不散的旧账。药铺后堂传来沉闷倒地声，掌柜仰面倒在灯火中央，一封旧信被雨水濡湿边角，墨迹反倒愈发狰狞：它不是情书，而是一纸拖延多年的宣判。漕运、租界与宗族体面在同一场雨里交锋；五位身份悬殊之人被迫在同一屋檐下供述乡愁与贪欲。此案要写氤氲水汽里的史诗气质——柔情可以是掩护，也可以是淬毒的刃鞘。谁在药方配伍之外另写了一味致命的仁慈？'
  },
  {
    id: 'studio_fire',
    title: '画室余烬',
    tagline: '火焰退场太早；松节油替画布遮掩最后的落款',
    genre: '都市推理',
    era: '现代',
    suspectCount: 4,
    description:
      '救火队员扑灭明火的速度如同抹去一页插画——尸体却以不合火势的姿势匍匐：更像是生前曾被定格在某个屈辱的姿势里。松节油的气味冷冷压住焦臭，墙上空缺的画框沉默得像缺席的证人。艺术圈的恭维话在此失效：策展人、藏家与门徒都必须交出颜料之下的指纹与账目。本作是一部当代都市奥德赛——虚荣与救赎共用一支画笔；你得辨认谁在灰烬里伪造了自己的不在场肖像，谁又借火光烧毁唯一能赎回良心的契约。'
  },
  {
    id: 'phone_booth',
    title: '电话亭里的第七声',
    tagline: '城市遗弃的电话亭仍在午夜点数；第七声落下有人缺席人间',
    genre: '都市推理',
    era: '现代',
    suspectCount: 4,
    description:
      '霓虹背面矗立着被遗忘的电话亭——它在零点敲响七次，像极了古老诅咒的现代译本。接线的人在翌日失踪，水泥地面留着一圈无言的水渍，录音倒带时传出断续笑意：那不是欢愉，是被剪辑过的恐吓。四名都市幽灵各有深夜的职业：夜班工人、出租车司机、夜班保安与潦倒债主，谁的嗓音能与磁带共振？本作写出水泥森林里濒临熄灭的人性公共设施——当你拾起话筒，接通的可能不是号码，而是一个城市的忏悔席。'
  },
  {
    id: 'ancient_mansion',
    title: '古宅灯影',
    tagline: '家谱缺一页香火仍燃；祠堂规矩养出了最高明的说谎者',
    genre: '古风疑案',
    era: '古代',
    suspectCount: 5,
    description:
      '青砖黛瓦的古宅是一座活的律法博物馆——香火未曾断绝，家谱却被粗暴撕去一页，仿佛先祖自愿弃权。族长横死于灯影摇曳之处，门槛香灰留着一进一出的礼节脚印：凶手显然懂得如何跪拜与绕行礼制。宗亲与管家各守本位，却把私心藏在揖让之间。此案不求猎奇机关，而求宗族史诗的张力：礼教既可庇护弱者，亦可驯化为暴力的修辞。你将拆解祠堂两侧的楹联——对联背后往往是两座互相指控的墓碑。谁撕走的不是一页纸，而是一代人的血统合法性？'
  },
  {
    id: 'midnight_foyer',
    title: '午夜玄关',
    tagline: '门槛是现代神庙；门锁记账，猫眼缄默',
    genre: '居家伦理',
    era: '现代',
    suspectCount: 4,
    description:
      '同一栋楼里，每户玄关都像微型法庭——电子锁吐出冷冰冰的时间戳，外卖袋泄露味觉偏好，地毯深处一滴血的半径丈量亲密与敌意。这里没有广袤风雪衬托壮烈，却把现代人的孤立写到极致：邻里相距三尺，却比异域更远。四名嫌疑人被困在日常器物构成的迷宫：谁会刷卡，谁会代收快递，谁又曾在门禁盲区驻足过久？本作是一部浓缩的家庭史诗——谋杀从来不只是突发事件，它是长年积累的音量在某个午夜抵达阈值的一声爆裂。'
  },
  {
    id: 'peephole_neighbor',
    title: '对门猫眼不说话',
    tagline: '电梯井吞下五分钟空白；可视对讲云端缺席了一段喘息',
    genre: '居家伦理',
    era: '现代',
    suspectCount: 5,
    description:
      '高层走廊是一条悬浮于地面的微型街巷——猫眼窥孔嵌在每扇门扉上，却把伦理磨成窥私欲。云端录像离奇缺席五分钟，电梯红外却捕捉到半途折返的背影：两段叙事互相指控，谁在说谎便牵扯出一整条邻里生态链。物业费、停车位、补习班与孩子哭声都可能成为导火索。本作要写当代寓言中最锋利的邻近：爱是串门，恨亦是串门。你将质问每位住户——当晚谁的鞋底带走了本该留在门口的歉意？真相从来不响亮，它只是卡在门禁扬声器边缘的一声杂音。'
  },
  {
    id: 'xianxia_sword_mound',
    title: '剑冢啸鸣夜',
    tagline: '石碑裂痕记下昨夜天道的一声咳嗽',
    genre: '仙侠诡事',
    era: '架空',
    suspectCount: 5,
    description:
      '剑冢之于宗门，如同史册之于王朝——埋葬锋刃即是埋葬未被书写的杀戮与赦免。昨夜啸鸣三声穿云裂石，执法长老伏尸碑前，裂痕崭新得像天道亲笔落款。剑气逆涌与丹毒柔噬在同一人喉咙争执不下：谁在假借天门威严修剪私仇？五名弟子执礼仗剑而来，却不能不承认修为亦可沦为暴力的修辞。本作是一部修仙史诗的悲剧楔子——天道不仁并非空话，而是一柄悬于众人头顶的无形秤杆。你若揭开谜底，或许会动摇整座山门赖以安眠的神话叙事。'
  },
  {
    id: 'xianxia_pill_room',
    title: '丹炉余温杀人',
    tagline: '炉火温顺得像抚慰；温顺有时会掐断咽喉',
    genre: '仙侠诡事',
    era: '架空',
    suspectCount: 4,
    description:
      '丹房之内余温袅袅如诵经——长老却无烟熏瘢痕，死因更像是某种近乎温柔的篡夺：生机被人礼貌地截断。丹纹错位一缕足以改写药性；记事簿上的时辰被人指尖抹糊，仿佛连同死者姓名一并抹去。炼丹从来不是玄学噱头，它是精密残酷的生命经济学。四名知情人各有炉火旁的职守：谁在配伍之外添了一笔禁忌？本作要写修仙世界里「救治」二字的暗影——良药与谋杀共用同一套火候术语，只差发心那一厘间距。'
  },
  {
    id: 'school_night_class',
    title: '晚自习教室十一点',
    tagline: '黑板尽头多一行公式；投影仪循环播放谁的缺席证明',
    genre: '校园推理',
    era: '现代',
    suspectCount: 4,
    description:
      '教学楼铁门落锁之后仍有一点倔强光亮——十一点的光不该属于青春期以外的人。讲台上卷子摊开像微型法庭笔录，粉笔灰与指纹争抢话语权：黑板顶端多出歪斜痕迹，投影仪固执回放某一帧教案，仿佛在嘲笑考勤制度的仁慈。守则写成条文未必公正，却往往精确地标出怨恨的生长坐标。四名师生被困在青春的密闭剧场——暗恋、攀比、羞辱与代偿在同一条走廊共振。本作是一段浓缩的成长史诗：谁在钟声之外私自延长了权力的晚自习？谜底揭晓之时，铃声会像判决书回荡空旷楼道。'
  },
  {
    id: 'office_deadline',
    title: '截止日电梯井',
    tagline: '夹层藏着城市的第二种重力；硬盘备份比遗嘱更像遗书',
    genre: '职场推理',
    era: '现代',
    suspectCount: 5,
    description:
      '截止日前夜的写字楼是一座发光的地下墓穴——中央空调低声诵经，显示屏蓝光审判怠惰与野心。有人在电梯夹层目击不该出现的影子：夹层并非隐喻，它是都市丛林的真正胃部，吞咽临时工牌与黑名单。谁在备份硬盘写入最后一秒的差异足以改写并购与人命？本作是一部职场奥德赛——邮件抄送名单背后是权力的家谱；甲方乙方措辞背后是暴力的修辞术。五位竞争者被迫在同一垂直空间里供述饥饿：你若揭露凶手，也同时撕开体面制服下的肋骨与缝线。'
  },
  {
    id: 'scifi_pod',
    title: '休眠舱误差三秒',
    tagline: '真空不语；呼吸节律是比星辰更冷酷的法典',
    genre: '科幻悬疑',
    era: '近未来',
    suspectCount: 4,
    description:
      '深空静默并非仁慈——它只是把谋杀翻译成术语：气压曲线、氧气配比、跃迁倒计时。三秒钟误差足以判决生死，日志却被温柔覆盖一次，宛如一封匿名的谋杀告白贴在舱壁上。这里没有风雪可作布景，却有更凛冽的制度真空：谁在规程缝隙里按下那只看不见的阀门？本作是一部科幻史诗的缩影——文明愈精密，个体的宽恕愈昂贵；四名乘员互为镜像又互为陪审团。你若对齐星历与人心的时差，或许会听见宇宙深处传来缓慢的心跳回声——那是幸存者对遇难者的迟到致歉。'
  },
  {
    id: 'country_villa_weekend',
    title: '郊墅周末宴',
    tagline: '暴风雪剪断路牌；宴会还在继续，主人已无应答',
    genre: '居家伦理',
    era: '现代',
    suspectCount: 5,
    description:
      '社交媒体上烤箱与红酒仍在发光——肉身却已倒在露台躺椅，暴雪封死退路也封死辩解：每户宾客怀揣上周未曾了结的旧账与今日的体面谎言。泳池漂白水的刺鼻气味掩盖了什么更难闻的恐惧？本作是一部中产阶级的暴风雪史诗——它不是童谣连环杀戮，而是亲密关系在长期渗漏后的崩塌演示。五人被困取暖灯下互相测温：谁在敬酒词背后藏着敲诈？谁又曾在暴风眼中亲手熄灭一盏本会照亮真相的庭院灯？'
  },
  {
    id: 'sect_library_page',
    title: '藏经阁缺页',
    tagline: '纸页缺席之处，风声朗诵死刑判决书',
    genre: '仙侠诡事',
    era: '架空',
    suspectCount: 5,
    description:
      '藏经阁彻夜长明不止为了读经——而是为了看守那些被写成文字的禁忌欲望。值守弟子声称风动铃响如叩门，档案却在墨迹深处揭发有人翻动禁录之名：封印符灰落于砚畔，宛如灰烬签下认罪笔名。本作是一部修仙世界的知识史诗——典籍的重量可比山峦；一字之差足以改写山门百年气运。五位守门人与求索者互为镜像：谁在月色翻译古语之外另写下一句诅咒？谜底翻开之时，整座藏经阁会像心脏停顿一拍——听见页码簌簌坠落如雨。'
  },
  {
    id: 'cable_car_sanctuary',
    title: '缆车终点站',
    tagline: '钢索在空中诵经；控制室反锁的门扉拒不认罪',
    genre: '封闭空间',
    era: '现代',
    suspectCount: 4,
    description:
      '最后一厢缆车悬停于云海裂隙——下面是万丈静默，上面是人类自作聪明的钢铁祷告。控制室内侧落锁如封印，啸叫的风箱像在倒数某人余生的心跳节拍。四名被困者与岗位职责捆绑：谁在电压起伏之间藏匿第二次呼吸？本作不是高空惊悚噱头，而是一阙压缩在钢缆上的命运赋格——空间的囚笼之所以残忍，是因为它逼迫你把懦弱与勇气压缩在同一立方米的 conscience 之内。谁在控制台按下暂停之前先暂停了自己的怜悯？'
  },
  {
    id: 'subway_last_train',
    title: '末班地铁十三号口',
    tagline: '隧道回声多出闲置一拍；时间在铁轨两侧分道扬镳',
    genre: '封闭空间',
    era: '现代',
    suspectCount: 5,
    description:
      '末班车远去后的站台应按理应沉入梦乡——清洁工推着夜色转弯，却发现排水沟里留着新鲜的谦卑鞋印：谦卑有时是逃犯的最后体面。屏蔽门夹住半张工牌如同咬住半截供述；时钟与监控相差一秒，足以改写五个人的人生履历。本作是一部都市地下史诗——隧道不只是通达之路，亦是文明的下水道：怨气、乡愁与剥削在其中回荡放大。谁在铁轨震颤掩护下扼杀了另一个人对未来的站台换乘权？揭晓谜底之时，你会觉得整座城市的地下水脉都已记住了那次延误。'
  },
  {
    id: 'rooftop_greenhouse',
    title: '天台玻璃花房',
    tagline: '穹顶之内叶绿素漂白罪恶；湿度传感器记录了无声的共谋',
    genre: '都市推理',
    era: '现代',
    suspectCount: 5,
    description:
      '摩天楼顶的玻璃温室本应盛放富贵闲情——却成了某位闯入者最后的摇篮曲舞台。死者死在精密湿度探头旁边，门禁却在云端冷冷宣读「无人进出」的天真谎言：穹顶光影交错之间，植物的阴影足以藏匿第二次心跳。本作是一部垂直城市的寓言史诗——高空养花是种傲慢的权力隐喻：谁能修剪枝叶，便能修剪他人的存活半径。五位写字楼幽灵被迫交出加班以外的私密履历：谁在喷淋误触警报背后排练了一场谋杀彩排？等你掀开叶面水珠，会看到霓虹倒映出血色光谱。'
  },
  {
    id: 'crypto_exchange_vip',
    title: '交易所贵宾室断连',
    tagline: '光纤被粗暴拔掉的一刻，某种永恒短暂的暴富幻觉断电',
    genre: '都市推理',
    era: '现代',
    suspectCount: 4,
    description:
      '剧烈跳动那一分钟的行情曲线宛如心电图抽搐——贵宾室却被粗暴拔掉网线：谋杀退回原始的触觉时代。死者贴在冷冽机柜旁，指纹膜与热成像彼此指控：算法诚实得像冰山，却在人情海面之下暗藏裂缝。本作是一部数字资本主义的小型史诗——钱包签名比情书更易伪造；合规话术背后往往是合法的掠夺语法。四名知情人手握密钥碎片：谁在断电零点写下额外的一笔转账——那不是金钱，是一条人命贴现后的收据编号？'
  },
  {
    id: 'temple_incense_murder',
    title: '山寺香火夜',
    tagline: '钟声本应超度；今夜钟杵偏移半寸成凶器隐喻',
    genre: '古风疑案',
    era: '古代',
    suspectCount: 5,
    description:
      '山门闭合并不意味着神明睡去——香火仍旧袅袅上升，像在递交人世间延迟已久的申诉。住持仰倒蒲团之上，梵呗戛然而止；功德箱底层泛起潮湿气息，如同藏匿的眼泪或赃款。经文缺失一页偈语，恰似天理留白等人填空。本作是一部山地寺院史诗——佛门叙事从不止于戒律条文；它也是权力与施舍互为筹码的平衡术。五位僧俗交错而立：谁在檀香掩护下改写因果账本？谜底揭晓之时，钟声会像钝器重击胸腔——提醒你超度二字亦可读写成掩埋。'
  },
  {
    id: 'brush_letter_death',
    title: '赝品书斋',
    tagline: '墨池倒映生与死两张面孔；落款只差一枚印章的重量',
    genre: '古风疑案',
    era: '古代',
    suspectCount: 4,
    description:
      '藏家大开筵席炫耀墨宝——夜半书斋却传来肉身坠落的沉闷回声：卷轴无恙，人命却被粗暴卷起。砚底蜡封封存何种秘密契约？真迹背面墨迹新鲜得像凶手昨夜仓促签署的认罪草稿。本作是一部文人圈的史诗寓言——赝品从来不只是技法层面的骗局，它也是名誉与记忆的洗钱装置。四名雅集中人皆有提笔之力：谁在挥毫落款之外另写下通往地狱的行书偏旁？水墨浓淡之间，你将领悟艺术的崇高与卑鄙共用一支狼毫。'
  },
  {
    id: 'floating_market_dawn',
    title: '水上集市拂晓',
    tagline: '橹声未起波纹先作证；秤杆记住每只手的私心刻度',
    genre: '民国悬疑',
    era: '1920s',
    suspectCount: 5,
    description:
      '江南水汽尚未散尽，集市已在朦胧灯影里铺开浮动版图——渔船相连如同移动的城池，摊主叫卖声中藏匿饥荒年代的算术与体面。有人在鱼摊后方悄然倒下：波纹抹去大半脚印，却无法抹去秤杆上的血指纹——那是熟人世界里最后倔强留存的在场签名。本作是一部漕运市井史诗——它不渲染廉价的乡土怀旧，而是写河道如何在商贸伦理之下暗暗流血。五人背负宗族与欠债的双重潮汐：谁在斤两换算之外另换算了一条人命折旧率？天亮时分雾散之处，亦是谎言搁浅露出白骨的时刻。'
  },
  {
    id: 'clockwork_ball_murder',
    title: '洋行舞会钟表停格',
    tagline: '华尔兹旋转之中有人提前离场；指针重叠像共谋握手',
    genre: '民国悬疑',
    era: '1930s',
    suspectCount: 4,
    description:
      '水晶吊灯折射租界浮华——衣冠楚楚的人群旋转如同命运的齿轮演示，主人却在休息室永远缺席舞会终曲。怀表指针诡异重合：那是机械巧合抑或凶手替你签署的精密不在场寓言？本作是一部民国洋行史诗——钟表从来不只是计时工具，它是殖民现代性进入中国血液的隐喻导管。四名舞会参与者互换恭维与借条：谁在香槟气泡爆裂声中调换生与死的席位卡？谜底揭晓之际，你会觉得整座洋行的黄铜装潢皆在低鸣——像是迟到百年的警钟终于对齐刻度。'
  },
  {
    id: 'dormitory_four_twelve',
    title: '宿舍 412 熄灯后',
    tagline: '监控眨眼偷走十秒青春；阳台球鞋湿透谁的潜逃修辞',
    genre: '校园推理',
    era: '现代',
    suspectCount: 4,
    description:
      '熄灯铃落下如同宣判宿舍楼进入梦乡缓刑——却仍有一丝倔强光亮拒绝熄灭：有人在隔壁空置床位留下体温印记，宛如幽灵借壳重生。门禁刷卡记录、班长查寝台账与外卖送达截图并行三套叙事：谁在青春的岔道口撒谎更像求救？本作是一部寄宿史诗的微缩模型——寝室从来不只是睡眠之所，亦是微型法庭与宗族替身。四名同龄者在走廊灯下互为陪审：谁在栏杆阴影完成一跃而过的罪行换位？你将意识到成年礼不一定在毕业典礼——有时它在某个湿漉漉球鞋停靠的阳台悄然盖章。'
  },
  {
    id: 'canteen_cold_room',
    title: '食堂冷库夜班单',
    tagline: '冷气记账比人情冷酷；温控曲线陡峭得像谁在喘息',
    genre: '校园推理',
    era: '现代',
    suspectCount: 5,
    description:
      '凌晨食堂冷库本该只剩寒气诵经——单据却签下第二名幽灵签字：配送链条上出现重叠指纹与重叠贪欲。霜花在门板内侧画出异常弧线，宛如某一扇通向良心的入口曾被长时间敞开又狠心合上。本作是一部校园后勤史诗——廉价劳动力与承包商契约暗藏锋利的剥削修辞；冷气掩盖的血腥味更接近真实的阶级寓言。五人穿行不锈钢巷道彼此测温：谁在口令权限之外拥有一串伪造的温度豁免权？谜底揭晓之时，你会觉得蒸汽升腾不仅来自蒸笼——亦来自压抑多年后骤然炸裂的少年仗义或懦弱。'
  },
  {
    id: 'remote_meeting_mute',
    title: '全员静音之后',
    tagline: '屏幕定格预算某一栏；会议室玻璃门锁住了缺席的回声',
    genre: '职场推理',
    era: '现代',
    suspectCount: 5,
    description:
      '视频会议散了——线下的会议室却仍囚禁一道未曾离场的心跳回声：静音键是现代职场最小的缄默法令，却能盖住求救与认罪两句同质台词。云端录像无故短缺一秒帧率如同叙事自愿阉割：谁在麦克风指示灯亮起一刻吐出真话又被拖拽回虚无？本作是一部当代职场的小型史诗——投影光束替代神明裁决每位参与者 KPI 背后的良知贴现率。五人互为上下游链条：谁在预算表格注释栏写下看不见的匕首编号？你若对齐线上线下两份时间的时差，也许会听见办公楼中央空调在为某位缺席者低声诵经。'
  },
  {
    id: 'cargo_manifest_ghost',
    title: '货舱舱单多了一个名字',
    tagline: '真空收纳星辰亦收纳谎言；减压病症提前为谁排练',
    genre: '科幻悬疑',
    era: '近未来',
    suspectCount: 4,
    description:
      '货运穿梭泊入检疫闸门——冷藏曲线陡升宛如某人轻柔扼喉留下的心电图遗迹；舱单凭空多出无名行者：真空从不仁慈，它只是把谋杀改写为术语堆砌的事故调查报告。本作是一部星际物流史诗——货物与人命在条形码层面等价兑换的危险寓言正在上演。四名乘员互为备份镜像：谁在气闸日志之外签下第二条姓名笔画？谜底对齐之时，你会觉得宇宙静默并非空灵——它只是把所有尖叫调成人类鼓膜不可接收的频率罢了。'
  },
  {
    id: 'fog_lighthouse_inn',
    title: '雾塔旅馆',
    tagline: '光束第三次掠过窗棂时沉默作答；礁石吞咽失足之名',
    genre: '孤岛风暴',
    era: '现代',
    suspectCount: 5,
    description:
      '半岛雾季把海岸线磨成失声磁带——旅馆与灯塔共用一根摇摇欲坠的供电脐带：黑暗中灯塔依旧是神学隐喻，逼迫人们在光束横扫百叶的瞬间承认自己渺小。停电刹那有人坠入礁石裂缝：潮汐倒计时冷漠得像终审判决书封面墨迹。本作是一部海岸孤岛史诗——柴油机轰鸣与雾笛长啸互为低音部交响；五人被困浪潮与流言夹击之中：谁在蓄电池电量衰减曲线掩盖了一次蓄意迟缓救援？天亮雾散并不等于救赎降临——有时它只是残酷地把残骸陈列在阳光法庭之上接受曝晒。'
  },
  {
    id: 'star_chart_pavilion',
    title: '观星台错位一夜',
    tagline: '星胶片缺一帧曝光；天道与被篡改的天象互相指控',
    genre: '仙侠诡事',
    era: '架空',
    suspectCount: 4,
    description:
      '观星台本该在子时校准天地脉搏——胶片却缺一帧曝光如同神明眨眼纵容罪行发生：阵眼残留石粉与某人靴底晶屑同源，这意味着践踏星河之人未曾意识到自己足迹亦可成为定罪经纬。本作是一部修仙历法史诗——星辰不是布景板，它们是权力的天文学修辞；篡改星象等同于篡改合法性源头。四名修道者在罡风之上辩论天机与人欲：谁在罗盘刻度之外暗中扭转他人的命盘宫位？谜底揭晓那一刻，你会觉得夜空繁星宛如冷酷陪审团睁眼俯瞰山门微不足道的私欲之火。'
  },
  {
    id: 'balcony_sparrow',
    title: '阳台上的麻雀不飞',
    tagline: '高层风里麻雀凝固；烟头与晾衣夹暗中互换罪名',
    genre: '居家伦理',
    era: '现代',
    suspectCount: 4,
    description:
      '高空风声锐利像剃刀掠过护栏——麻雀停在花盆边缘迟迟不肯起飞：那是自然界对人类僵持不下的蔑视隐喻。邻居争辩争执楼层却始终含糊：阳台栏杆新鲜擦痕暗示有人在垂直立面排练了一场双人皮影戏——时间与高度共谋掩护罪行撤退路径。本作是一部垂直社区的微观史诗——水泥森林里每户阳台皆是悬空审判席；亲密关系与窥私欲共用一根晾衣绳。四名相邻住户互为回声壁：谁在烟头火星熄灭前后掐灭了另一条呼救声带？谜底对齐之际，你会觉得城市夜空霓虹皆为冷眼旁观证人。'
  },
  {
    id: 'ink_pavilion_rain',
    title: '墨亭听雨录',
    tagline: '积水深浅不一丈量善恶倾斜度；瓦脊绕过摄像冷眼俯瞰园林',
    genre: '民国悬疑',
    era: '1930s',
    suspectCount: 5,
    description:
      '私家园林借雨设宴本是风雅盛事——诗笺尚未干透墨迹便浸泡在新的血色修辞之中：死者倒地那一刻积水倒映第二道摇曳影子，如同叙事被迫分叉成双线并行悲剧。本作是一部民国文人圈的史诗小品——亭台楼阁从来不是避风港，它们是话语权力的隐喻几何；谁在平仄格律之外写下绝句之外的匕首韵脚？五人怀抱稿酬、声名与旧怨登台：谁在瓦脊暗影绕过现代化摄像初生笨拙之眼完成谋杀谢幕？雨停并不等于结案——青石板上水印会慢慢蒸发成史的脚注供后人摩挲刺痛。'
  },
  {
    id: 'jade_workshop_shift',
    title: '玉雕作坊换班缝',
    tagline: '玉屑如雪亦可如雪掩埋指纹；砂轮转速背叛了某位工匠的心跳',
    genre: '古风疑案',
    era: '古代',
    suspectCount: 4,
    description:
      '作坊粉尘长年飞舞如玉屑降雪——匠人自以为掌控刀的走向与玉的屈服曲线；可当作坊主倒在粉尘最深处且手套洁白得像未曾沾染尘世，你就知道精巧技艺亦可沦为谋杀修辞：砂轮转速记录陡然跳变仿佛某人借机抽空一秒仁慈。本作是一部手工艺史诗——玉器从不二次碎裂同一裂痕；人性却可以无数次自欺修补裂缝。学徒、账房、镖师构成三角形稳固张力：谁在换班缝隙插入另一条看不见的工时班次？谜底揭晓之际，你会觉得那块尚未完工的玉雕冷冷反光——恰似推迟到来的天理之眼缓缓睁开一条缝隙。'
  }
];

/** 筛选标签排序：其余类型自动排在末尾（按拼音） */
export const GENRE_FILTER_ORDER = [
  '民国悬疑',
  '古风疑案',
  '仙侠诡事',
  '居家伦理',
  '都市推理',
  '孤岛风暴',
  '封闭空间',
  '校园推理',
  '职场推理',
  '科幻悬疑'
];

export function orderedCatalogGenres() {
  const present = [...new Set(SCRIPT_CATALOG.map(s => s.genre).filter(Boolean))];
  const head = GENRE_FILTER_ORDER.filter(g => present.includes(g));
  const tail = present.filter(g => !GENRE_FILTER_ORDER.includes(g)).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  return [...head, ...tail];
}

function deepClone(x) {
  return JSON.parse(JSON.stringify(x));
}

function normalizeSuspects(suspects, count) {
  return suspects.slice(0, count);
}

function ensureKillerIncluded(suspects, killerIndex, count) {
  if (count >= suspects.length) return { suspects, killer_index: killerIndex };
  if (killerIndex < count) return { suspects: suspects.slice(0, count), killer_index: killerIndex };
  const sliced = suspects.slice(0, count);
  // swap killer into last slot
  const killer = suspects[killerIndex];
  sliced[count - 1] = killer;
  const newKillerIndex = count - 1;
  return { suspects: sliced, killer_index: newKillerIndex };
}

function suspectCountFor(scriptMeta, diff) {
  const base = scriptMeta?.suspectCount || 4;
  if (diff === 'easy') return Math.max(3, base - 1);
  if (diff === 'hard') return Math.max(base, base);
  return base;
}

/** 结案与复盘用的推理主轴（帮助玩家对齐逻辑，不参与随机糊弄） */
function axes(...items) {
  return items.filter(Boolean).slice(0, 5);
}

/**
 * 生成“雾锁蔷薇庄园”具体案件（同剧本可变：措辞、线索顺序、隐藏线索顺序、若干细节）
 */
export function generateRoseManor(rng, suspectCount) {
  const victimNames = ['沈仲衡', '沈元珩', '沈景衡'];
  const settings = [
    '1937年秋，胶东半岛临海庄园，暴风雨夜',
    '1936年冬，海崖庄园灯火摇晃，雷雨夜',
    '1938年春，海雾封路的庄园，狂风夜'
  ];
  const victim = {
    name: pick(rng, victimNames),
    age: pick(rng, [50, 51, 52, 53, 54]),
    occupation: '庄园主',
    discovery: pick(rng, [
      '次日清晨管家发现他倒在书房地毯上，胸口插着平日藏在抽屉里的裁纸刀',
      '黎明前仆人推门不应，书房里只剩一盏将熄的灯与倒下的身影',
      '风停后天色发白，书房门仍反锁，推开时血腥味扑面而来'
    ])
  };

  const suspectsBase = [
    {
      name: '周砚秋',
      gender: 'male',
      age: 48,
      role: '管家',
      relation: '服侍沈家二十年',
      surface_motive: pick(rng, ['数日前遗嘱公证时与东家当面争执', '昨夜曾因账册问题被训斥', '被人撞见深夜从书房附近匆匆离开']),
      alibi: pick(rng, ['风雨太大，我一直在楼下酒窖清点宾客退回的酒水', '我在库房整理银器，直到天快亮才回房', '我守着门厅，防止外人趁乱闯入']),
      secret: pick(rng, ['私下挪用库房现款填补赌债，最怕东家查账', '暗中与外头的买办来往，替东家办过脏事', '欠下高利贷，正被逼得走投无路']),
      is_killer: false
    },
    {
      name: '苏晚晴',
      gender: 'female',
      age: 28,
      role: '家庭教师',
      relation: '死者侄女',
      surface_motive: pick(rng, ['昨夜书房灯亮至子时，有人听见争执声', '近日频繁出入书房借阅文件', '被死者以“家声”为名严厉约束']),
      alibi: pick(rng, ['我在东厢批改学生卷子，雷雨声太大听不清楼下动静', '我整夜头痛，在房里点灯读书', '我在女仆房与人说话到很晚']),
      secret: pick(rng, ['暗中托人倒卖字画筹款还债，怕被舅舅察觉', '与外地恋人通信被截过一次', '曾偷看过遗嘱内容，担心分配不利']),
      is_killer: false
    },
    {
      name: '陆满仓',
      gender: 'male',
      age: 41,
      role: '厨师',
      relation: '受雇五年',
      surface_motive: pick(rng, ['寡言少语，案发后照常和面做早点', '昨夜夜宵由他亲手送去书房', '有人称听见后厨半夜传出争吵']),
      alibi: pick(rng, ['我整夜都在厨房和面蒸屉，伙计清晨可以作证', '我在灶间守火，没离开过', '我半夜去井边打水，回来就继续备料']),
      secret: pick(rng, ['弟弟跑船带货一直被东家拿证据要挟要钱', '家里有人病重急需银钱', '曾被东家羞辱过，心里一直记着']),
      is_killer: true
    },
    {
      name: '赵大山',
      gender: 'male',
      age: 36,
      role: '司机',
      relation: '外地招募三年',
      surface_motive: pick(rng, ['案发当天下午曾与死者因行车路线争执', '被人见到夜里在车库附近徘徊', '他对庄园地形极熟']),
      alibi: pick(rng, ['车停在车库我在屋里打牌，几个人都能作证', '我守着车库防雨，没进主楼', '我在仆役房睡下了，半夜没醒']),
      secret: pick(rng, ['私下帮东家递过几回见不得光的信件，攥着把柄也不敢辞工', '曾偷卖过汽油钱补贴家用', '与外人接触频繁，疑似被收买']),
      is_killer: false
    },
    {
      name: '秦宝生',
      gender: 'male',
      age: 22,
      role: '杂役',
      relation: '新来的帮工',
      surface_motive: pick(rng, ['昨夜被派去送伞，去向不明', '经常在书房外偷听', '行迹鬼祟']),
      alibi: pick(rng, ['我在走廊擦地，滑了一跤摔晕过去', '我在下人房修灯，没离开', '我在门房躲雨，直到天亮']),
      secret: pick(rng, ['其实是来找失散亲人的', '偷拿过庄园银匙想换钱', '被人威胁做过跑腿']) ,
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const rawKillerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, rawKillerIndex, suspectCount);
  const suspects = ensured.suspects;
  const killerIndex = ensured.killer_index;
  const killer = suspects[killerIndex];

  const initialClues = shuffleInPlace(rng, [
    '书房门窗从内锁住，无明显搏斗痕迹',
    pick(rng, ['死者手中紧握半枚牛角纽扣，绝非死者外衣所有', '死者掌心攥着半枚纽扣，边缘被血浸透']),
    '书桌上摆着厨房送来的宵夜托盘与一盏凉茶，均未动过',
    pick(rng, ['窗台尘土纹理完整，未见粗暴攀爬痕迹', '窗钩处有细微划痕，却不像外力撬开'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `死者指缝里半枚纽扣与${killer.name}常用围裙系带同源（缝线走向与牛角纹路吻合），指向「膳食一线」而非外人翻墙`,
    `管家笔录：夜宵托盘确由${killer.name}送入书房——这与「整夜不离灶台」必须在时辰表上一格格对齐；若送餐属实，独处窗口就已打开`,
    `家庭教师回忆：子时倒水瞥见人影佝偻退回西侧——西侧尽头连通内外厨房过道；身形更像常在烟火处佝偻劳作之人`,
    `裁纸刀藏于书桌抽屉底层——知情圈极小；能与夜宵送餐序列接连触碰到书桌的人，比声称从未入内的人更可疑`,
    `门板内侧有血手套摩擦留下的弧形痕迹：更像熟人反手关门而非闯入者仓促逃离——与外撬窗台叙事相悖`
  ]);

  return {
    title: '雾锁蔷薇庄园',
    setting: pick(rng, settings),
    victim,
    killer_index: killerIndex,
    kill_method: '裁纸刀刺穿心脏',
    motive_truth:
      '庄园主掌握厨师亲属走私证据并以揭发要挟反复敲诈；厨师在生存与家人压力下形成「动机峰值」，最终以送餐为契机接近并完成密室现场的可控收尾。',
    full_truth:
      '暴风掩盖脚步声：凶手借夜宵入室，趁庄园主转身取酒抽出藏于抽屉底层的裁纸刀一击致命；其后反手从内落锁，擦掉显眼指纹却遗漏纽扣纤维与时间线破绽——密室并非天外飞来，而是熟人用手边的秩序伪造秩序。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '密室像一封工整的信——字迹越对称，越可能是熟人反手落款。',
      '夜宵托盘是一条时间表：灶台誓言经得起一寸寸拆开吗？',
      '裁纸刀睡在抽屉底层——外人凭什么摸得到那份深浅？',
      '纽扣不认体面，只认烟火与围裙上的缝线。',
      '谁在风暴夜把自己的行踪说成一条直线？直线往往是编的。'
    )
  };
}

export function generateIslandHotel(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['乔曼', '梁惟安', '沈知微']),
    age: pick(rng, [31, 34, 37, 40, 42]),
    occupation: pick(rng, ['旅行摄影师', '投资顾问', '海洋科考助理']),
    discovery: pick(rng, [
      '断电后不久，有人发现TA倒在配电室门内，手边攥着一枚陌生钥匙圈',
      '夜里留声机忽然响起，巡夜者赶到时只见配电室里一具倒下的身影',
      '海雾最浓的时刻，配电室传来闷响，等人推门进去一切已晚'
    ])
  };

  const settings = [
    '现代，海雾封航的孤岛旅馆，断电之夜',
    '现代，风暴横扫岬角旅馆，午夜停电',
    '现代，孤岛旅馆外海浪如鼓，凌晨两点'
  ];

  const suspectsBase = [
    {
      name: '段若琳',
      gender: 'female',
      age: 29,
      role: '前台经理',
      relation: '负责旅馆运营',
      surface_motive: pick(rng, ['断电前与死者在大堂低声争执', '对外宣称配电室钥匙只有她保管', '停电后第一时间锁了通往地下的门']),
      alibi: pick(rng, ['停电后我在大堂安抚住客，摄像头能证明', '我一直在前台查房单与应急灯，没离开过', '我在厨房分发热水与毯子，很多人见过我']),
      secret: pick(rng, ['私下改过几笔账，怕被审计查出', '和某位住客有不方便公开的关系', '曾把备用钥匙借出去过一次']),
      is_killer: false
    },
    {
      name: '邱其远',
      gender: 'male',
      age: 45,
      role: '旅馆老板',
      relation: '旅馆所有者',
      surface_motive: pick(rng, ['死者声称掌握旅馆违规改建证据', '停电前他在配电室附近出现过', '他急着让所有人不要报警']),
      alibi: pick(rng, ['我在餐厅与客人喝酒到很晚，众人可证', '我一直在自己房间打电话处理航班问题', '我在屋外查看发电机，满身雨水就是证据']),
      secret: pick(rng, ['旅馆地下室有一间未登记的储物间', '欠下巨额贷款，旅馆濒临破产', '曾雇人“处理”过麻烦事']),
      is_killer: false
    },
    {
      name: '许望潮',
      gender: 'male',
      age: 38,
      role: '机修电工',
      relation: '负责电力与设备',
      surface_motive: pick(rng, ['配电室最熟悉的人偏偏说“今夜没进去”', '停电后他手上有新鲜擦伤', '他说钥匙圈不是他的却说出型号']),
      alibi: pick(rng, ['停电后我在发电机房抢修，机器声很大', '我在仓库找保险丝，有人能证明', '我沿走廊检查应急灯，来回跑了很多趟']),
      secret: pick(rng, ['私自倒卖过旅馆零件', '曾被死者偷拍过“拿走东西”', '与老板有一笔不干净的分成']),
      is_killer: true
    },
    {
      name: '白岚',
      gender: 'female',
      age: 33,
      role: '驻店歌手',
      relation: '常驻表演',
      surface_motive: pick(rng, ['留声机响起时她刚好离开休息室', '她知道后台暗道通向地下', '死者曾向她打听“地下有什么”']),
      alibi: pick(rng, ['我在吧台附近唱歌，停电后一片混乱但有人记得我', '我在房里练歌，没必要去配电室', '我在走廊找手机信号，顺便帮人找蜡烛']),
      secret: pick(rng, ['欠了经纪人一笔钱', '偷偷录下过客人的对话', '有个旧案牵连到她的真名']),
      is_killer: false
    },
    {
      name: '唐屿',
      gender: 'male',
      age: 26,
      role: '背包客',
      relation: '旅馆住客',
      surface_motive: pick(rng, ['停电时他不在房里', '他随身带着一串钥匙却说只是纪念品', '他对旅馆结构异常熟悉']),
      alibi: pick(rng, ['我在屋外抽烟看海雾，没人会注意我', '我在厨房找吃的，厨师看见了', '我在楼梯间拍视频，手机有时间戳']),
      secret: pick(rng, ['其实是来找某个人的', '曾做过小偷但已洗手不干', '他包里藏着一份不可告人的合同']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const rawKillerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, rawKillerIndex, suspectCount);
  const suspects = ensured.suspects;
  const killerIndex = ensured.killer_index;
  const killer = suspects[killerIndex];

  const initialClues = shuffleInPlace(rng, [
    '配电室门把上残留潮湿的海盐味指印，像是刚从室外回来的人留下的',
    pick(rng, ['地上有一圈被拖拽过的灰尘弧线，像移动过重物', '配电柜下方的螺丝有新鲜拧动痕迹']),
    '死者掌心攥着一枚陌生钥匙圈，上刻“12”字样',
    pick(rng, ['留声机的唱针断了一截，卡在盘缝里', '大堂留声机的唱片被换过一面'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `钥匙圈「12」对应地下储物间编号——上月巡检签字栏留有「${killer.name}」字迹，死者显然跟到了这条线`,
    `${killer.name}工具盒里同批次刀头缺失一枚，与配电柜螺孔新鲜痕迹的刀头剖面吻合（非住客随手能拿到的工具精度）`,
    '停电前十分钟前台房号遭涂改：像是有人提前把目击者支到错误走廊，给配电室开门制造空档',
    '配电室通风口夹着一段纤维，与旅馆工程部冬季工装的织法一致——海雾咸味黏在袖口内侧',
    `发电机日志有一段手动复位时间与「断电猝停」不一致——更像是人为制造瞬时停电掩护会面`
  ]);

  return {
    title: '孤岛旅馆的回声',
    setting: pick(rng, settings),
    victim,
    killer_index: killerIndex,
    kill_method: pick(rng, ['电击致死后伪装成意外', '钝器击打后伪装成停电混乱', '勒颈后伪装成跌倒撞击']),
    motive_truth: pick(rng, [
      `死者拍到配电改造私改电路并牵涉地下室储物走私链条；${killer.name}是唯一同时具备「断电操控能力」与「钥匙知情」的岗位角色，曝光对其致命。`,
      `死者攥着的编号钥匙圈指向维修台账的黑洞条目——签字闭环落到${killer.name}头上；风暴夜是最好的盲区。`
    ]),
    full_truth:
      '凶手并非闯入者：他以检修为名熟悉配电阈值与复位顺序，短时制造停电诱导死者独自前往配电室对峙；击杀后趁混乱抹去指纹层级证据，却把刀头批次与巡检签字留在了物的链条上。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '断电若是天意，复位日志为什么会脸红？',
      '「12」这把编号只会掉进谁的巡检字里？',
      '螺痕说的是钳工方言——前台学不会。',
      '海盐爬上配电室门把的那一刻，外面的风雨走进了谁的袖口？'
    )
  };
}

export function generateHighspeedTrain(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['韩启明', '谭映秋', '魏思齐']),
    age: pick(rng, [27, 30, 33, 39, 46]),
    occupation: pick(rng, ['记者', '医药代表', '金融从业者', '研究生']),
    discovery: pick(rng, [
      '列车穿入长隧道，灯光闪灭后，有人发现TA倒在车厢连接处附近，呼吸已止',
      '广播杂音骤起，乘务员巡查时在卫生间门口发现异常',
      '隧道后的第一站前，车厢里有人尖叫：有人“睡过去”再也醒不来'
    ])
  };

  const settings = [
    '现代，夜行高铁穿入长隧道的瞬间',
    '现代，跨省夜车，凌晨一刻',
    '现代，雨夜列车，车厢灯忽明忽暗'
  ];

  const suspectsBase = [
    {
      name: '宋知岚',
      gender: 'female',
      age: 32,
      role: '乘务员',
      relation: '负责本车厢服务',
      surface_motive: pick(rng, ['她掌握广播与车厢门禁的钥匙卡', '她对“旧车票”反应过度', '她在隧道前刚好离开岗位']),
      alibi: pick(rng, ['我在另一节车厢补给，时间戳可查', '我在对讲里报修广播杂音，组长可证', '我在车门处巡查，监控能看见']),
      secret: pick(rng, ['私下替人带过一次包裹', '曾被投诉服务态度，怕影响考核', '她认识死者却装作不认识']),
      is_killer: false
    },
    {
      name: '顾景行',
      gender: 'male',
      age: 44,
      role: '商人',
      relation: '同车乘客',
      surface_motive: pick(rng, ['死者曾打电话提到“你跑不掉”', '他携带的公文包一直不离身', '他在隧道灯灭时站了起来']),
      alibi: pick(rng, ['我在座位上打盹，旁边人看见了', '我在餐车，刷卡记录能证明', '我在通道接电话，很多人路过']),
      secret: pick(rng, ['合同里有不可告人的条款', '有人在追债，他在躲', '他与死者有旧账']),
      is_killer: false
    },
    {
      name: '罗小满',
      gender: 'female',
      age: 21,
      role: '学生',
      relation: '同车乘客',
      surface_motive: pick(rng, ['她手里一直攥着一张旧车票', '她说自己“第一次坐高铁”却很熟练', '她在卫生间附近逗留过']),
      alibi: pick(rng, ['我在座位上看剧，耳机记录能看', '我去接热水，排队的人记得我', '我在给家里发语音，一直没停']),
      secret: pick(rng, ['她并非学生，而是临时跑腿', '她替人保管过某样东西', '她的证件信息有一处对不上']),
      is_killer: false
    },
    {
      name: '林屿舟',
      gender: 'male',
      age: 35,
      role: '医生',
      relation: '同车乘客',
      surface_motive: pick(rng, ['他第一时间判断死者“已无救”', '他随身带着注射器与药盒', '他知道如何在封闭空间下手']),
      alibi: pick(rng, ['我在座位上写病例，整段时间没离开', '我在帮老人找座位，许多人看见', '我去洗手间只是洗手，很快出来了']),
      secret: pick(rng, ['他并非执业医生，证书过期', '他在药物上有灰色渠道', '他与死者职业相关且有过纠纷']),
      is_killer: true
    },
    {
      name: '陶向东',
      gender: 'male',
      age: 52,
      role: '列车安保',
      relation: '负责巡查',
      surface_motive: pick(rng, ['他有权临时封锁车厢连接门', '他在隧道前后两次巡查路线不同', '他对广播杂音的解释前后矛盾']),
      alibi: pick(rng, ['我一直在前后车厢巡查，有记录可查', '我在监控室帮忙，值班可证', '我在连接处检查门锁，乘务员见过我']),
      secret: pick(rng, ['曾私下收过好处放人过检', '他认识某个嫌疑人', '他那晚情绪极不稳定']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const rawKillerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, rawKillerIndex, suspectCount);
  const suspects = ensured.suspects;
  const killerIndex = ensured.killer_index;
  const killer = suspects[killerIndex];

  const initialClues = shuffleInPlace(rng, [
    pick(rng, ['死者掌心夹着一张旧车票，日期却早于今日数年', '一张泛黄旧车票被塞在死者指缝里']),
    '广播系统在隧道中段出现杂音与短暂停摆',
    pick(rng, ['连接处地面有一滴被鞋底抹开的透明液体', '座椅扶手上有一点不易察觉的药味']),
    pick(rng, ['有人说隧道灯灭时闻到一瞬间的消毒水味', '隧道灯灭的那一秒，有人听到针帽轻响'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    '透明残留物的挥发性窗口极短——更符合注射给药后在狭窄过道失去重心倒地，而非长途猝死',
    `急救箱借用签字在隧道时段附近有擦写痕迹：墨迹扩散形态符合列车晃动时的仓促掩盖——最接近急救叙事的人是自称医务身份的${killer.name}`,
    '旧车票背面号码刮花但仍可辨认运营商批次——对应数年一次的促销活动，反向指向购票时的实名联系人圈层',
    `有人听见针帽脆响同步于灯灭那一秒——说明动作在停电瞬间发生，预谋者熟知灯光节律`,
    `${killer.name}行李夹层检出一次性输液针头外包装碎片（批次与乘务补给不一致），更像自备器具而非车厢常备`
  ]);

  return {
    title: '夜行高铁 · 终点未明',
    setting: pick(rng, settings),
    victim,
    killer_index: killerIndex,
    kill_method: pick(rng, ['药物诱发呼吸抑制', '注射镇静后导致窒息', '药物致命过量']),
    motive_truth: pick(rng, [
      `死者掌握${killer.name}冒用医务权威走私镇静剂的证据并准备在到站交接举报——凶手只能在封闭区间内让对方「闭嘴」。`,
      `旧车票关联多年前的医患纠纷账单；${killer.name}要销毁可追溯的中间人链条，隧道是唯一可控的无见证窗口。`
    ]),
    full_truth:
      '这是一套精密依赖环境的作案：凶手熟知车厢照明节律与乘务巡查节拍，利用隧道断电瞬间贴近注射；伪装“猝死”却被药液残留、急救签字擦写与自备针头外包装反向锁定。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '灯灭那一秒太恰好——谁在节拍里埋伏动作？',
      '猝死是最体面的替身：药液可不答应。',
      '急救箱签字被擦掉的不是墨迹，是心虚的形状。',
      '旧车票要把你带回谁的旧账门口？'
    )
  };
}

export function generateOldTown(rng, suspectCount) {
  // 轻量都市变体（与高铁不同人物池），避免复用
  const victim = {
    name: pick(rng, ['许建安', '程远', '顾明哲']),
    age: pick(rng, [41, 45, 49, 52]),
    occupation: pick(rng, ['地产项目经理', '钟表修复师', '律师']),
    discovery: pick(rng, [
      '钟楼停摆当夜，有人发现他倒在钟室台阶上，手边是被撕碎的遗嘱复印件',
      '凌晨巡逻者上楼查钟，门没锁，里面却躺着一具冷下来的身体',
      '钟声消失的那一刻，附近住户听到一声闷响；赶到时只剩血味'
    ])
  };

  const settings = [
    '现代，旧城钟楼旁的文保街区，拆迁前夜',
    '现代，老街改造工地附近，雨夜',
    '现代，钟楼修复工程进行中，深夜'
  ];

  const suspectsBase = [
    { name: '罗锦', gender: 'female', age: 37, role: '项目协调', relation: '与死者共事', surface_motive: '资金链断裂，她与死者互相指责', alibi: '我在工地办公室对账，监控能查', secret: '私下收过回扣', is_killer: false },
    { name: '魏诚', gender: 'male', age: 54, role: '钟表匠', relation: '负责钟楼维护', surface_motive: '被死者以“拖延工期”威胁解约', alibi: '我在店里修钟直到凌晨，有徒弟作证', secret: '隐瞒了钟楼内部的一个暗格', is_killer: false },
    { name: '林栀', gender: 'female', age: 28, role: '记者', relation: '调查拆迁内幕', surface_motive: '死者阻挠采访，她当众怼过他', alibi: '我在酒吧做采访录音，时间戳可证', secret: '手里有一份未公开的录音', is_killer: false },
    { name: '韩岳', gender: 'male', age: 46, role: '安保队长', relation: '负责夜间巡逻', surface_motive: '钟楼钥匙与巡逻路线都在他手里', alibi: '我整夜在街区巡逻，队员可证', secret: '曾放过可疑人员进出', is_killer: true },
    { name: '周音', gender: 'female', age: 33, role: '律师助理', relation: '参与遗嘱文件', surface_motive: '遗嘱失踪，她最有机会接触文件', alibi: '我在律所加班，门禁记录可查', secret: '帮人做过一份“替代文件”', is_killer: false }
  ];

  const allSuspects = deepClone(suspectsBase);
  const rawKillerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, rawKillerIndex, suspectCount);
  const suspects = ensured.suspects;
  const killerIndex = ensured.killer_index;
  const killer = suspects[killerIndex];

  const initialClues = shuffleInPlace(rng, [
    '钟室门锁无撬动，像是熟人开门入内',
    '地面有一圈细碎金属屑，像被打磨过的齿轮粉',
    '遗嘱复印件被撕碎，唯独签名页不见了',
    pick(rng, ['钟摆后方有一道新鲜擦痕，像藏过东西', '钟盘背面残留一小段胶带'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `巡逻射频打卡在缺失时段最后一次刷卡编码对应${killer.name}胸牌——空白并非无人值守，而是记录被人事后改掉`,
    `${killer.name}钥匙串少了匹配钟室侧门的细齿钥匙，齿痕对比锁芯有新磨合痕迹`,
    '金属屑显微棱角与安保配发的铝合金手电锯齿磨损形态吻合——更像是仓促撬遮羞盖板留下的屑粒',
    '签名页折叠纹理与钟摆配重螺丝凹槽吻合——说明藏匿发生在停摆前后短时间内',
    `钟楼对讲留存电流噪声突变：有人在停摆前后按住通话键遮蔽脚步声——值班台账签名仍是${killer.name}`
  ]);

  return {
    title: '旧城钟声',
    setting: pick(rng, settings),
    victim,
    killer_index: killerIndex,
    kill_method: pick(rng, ['钝器击打后伪装成坠落', '勒颈后伪装成踩空', '推搡致颈椎折断后伪装意外']),
    motive_truth: `死者握有${killer.name}私放进场车辆并收受渣土回扣的闭环影像；以一纸遗嘱公证签字相要挟索要巨额封口费——迫使对方在钟楼制高点铤而走险。`,
    full_truth:
      '凶手掌握钟楼巡逻节拍与侧门钥匙权限：故意制造停摆引来项目经理对峙；击杀后将遗嘱签名页塞进钟摆暗格延迟暴露，并用打磨手电锯齿撬动盖板遮掩血迹喷射角度——物理链条却把屑粒与射频空白反向出卖。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '停摆若是邀请函——谁会准时上楼赴宴？',
      '侧门钥匙在谁腰间晃得最理所应当？',
      '失踪的不只是遗嘱一页，还有谁敢把它塞进钟声里？',
      '金属屑不会说谎：它是手电锯齿还是齿轮乡愁？'
    )
  };
}

export function generateOperaHouse(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['戚满堂', '萧振声', '沈鹤卿']),
    age: pick(rng, [46, 49, 53]),
    occupation: '戏班掌班',
    discovery: pick(rng, [
      '锣鼓甫歇，学徒推门只见掌班倒在妆奁旁，咽喉附近有细密针刺破口',
      '后台灯火摇曳，有人在胭脂粉尘里倒下，手里攥着一页撕破的演出排单',
      '压轴锣刚落，帘后人影一晃——掌班再也没站起来'
    ])
  };

  const suspectsBase = [
    {
      name: '穆凝霜',
      gender: 'female',
      age: 31,
      role: '当家青衣',
      relation: '戏班台柱',
      surface_motive: pick(rng, ['与死者昨夜争戏份当众翻脸', '死者扣了她的包银用作周转']),
      alibi: pick(rng, ['谢幕我一直在台前谢幕答谢观众', '我在厢房卸妆，丫鬟盯着']),
      secret: pick(rng, ['私下挪用过票房分成', '曾被死者捏住一封情书']),
      is_killer: false
    },
    {
      name: '裴少卿',
      gender: 'male',
      age: 26,
      role: '小生 · 班主之侄',
      relation: '亲属学徒',
      surface_motive: pick(rng, ['死者扬言要将戏班抵债卖掉', '他被训斥动了刀具道具']),
      alibi: pick(rng, ['我在侧幕候场有人作证', '我去后院拎热水']),
      secret: pick(rng, ['赌欠累累', '偷听过遗嘱般的口头分配']),
      is_killer: false
    },
    {
      name: '柳莺莺',
      gender: 'female',
      age: 38,
      role: '化妆师',
      relation: '掌班同乡',
      surface_motive: pick(rng, ['死者昨夜当众羞辱她手艺', '她的化妆箱贴着医用胶布']),
      alibi: pick(rng, ['我一直在后台给人贴片卸妆', '我去锅炉房拎热水']),
      secret: pick(rng, ['贩卖戏服赝品被死者握住账单', '懂得针刺麻醉门道']),
      is_killer: true
    },
    {
      name: '萧芷岚',
      gender: 'female',
      age: 44,
      role: '琴师',
      relation: '伴奏',
      surface_motive: pick(rng, ['死者拖欠三个月薪水', '她与化妆师同日请假被拒']),
      alibi: pick(rng, ['整场我都守在乐池', '中场我没离开']),
      secret: pick(rng, ['私下借钱给死者过桥', '听见后台低声争执']),
      is_killer: false
    },
    {
      name: '邢满仓',
      gender: 'male',
      age: 51,
      role: '箱倌 · 道具',
      relation: '负责刀枪把子',
      surface_motive: pick(rng, ['道具箱昨夜被动过', '他与死者有过库房争执']),
      alibi: pick(rng, ['我在台前盯道具出没离场', '我在暗门附近抽烟']),
      secret: pick(rng, ['私下典当过硬枪头', '偷卖戏票黄牛']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '死者咽喉破口边缘干净，更像针刺而非刀枪撕裂伤',
    '妆奁台上胭脂盒旁残留医用胶布碎片（戏班常备胶布极少用这种透气网格）',
    '后台暗门门锁外侧完好，内侧却有细微划痕——更像从内匆忙开合',
    pick(rng, ['死者掌心攥半页演出排单，边角沾脂粉呈孔雀蓝', '地面粉尘里有细小折断的假睫毛梗'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `孔雀蓝脂粉只在${killer.name}专属调色碟出现——其他人上妆色号与之不符`,
    `医用针头包装盒批次号与其化妆箱夹层纸片吻合——针刺麻醉并非外行临场起意`,
    '后台更衣队列登记显示：掌心死者倒地时段前后三分钟${killer.name}曾短暂离开锅炉房视线死角',
    `道具日志缺失一枚空心簪——簪腔可容纳微型药液囊；簪柄螺纹残留油脂成分与卸妆油配方同源`,
    `琴师证言补丁：争执关键词提到「赝品账本」——能把账本落到实物藏匿处的正是掌管妆容遮掩的人`
  ]);

  return {
    title: '戏台落幕后',
    setting: pick(rng, ['民国，临江戏园后台，锣鼓未尽夜', '民国，租界票房爆满的夜戏后场', '民国，城隍庙旁草台班子']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['针刺麻醉诱发窒息', '针刺颈部血管痉挛致死']),
    motive_truth: `${killer.name}贩卖戏服赝品并挪用定金形成账本闭环；死者当众羞辱并以揭发逼其交出私房积蓄填补窟窿——化妆师只能用后台最短盲区制造「体面猝死」。`,
    full_truth:
      '凶手熟悉登台节拍与粉尘遮蔽视线：趁换装盲区用针刺迅速了结，再利用胭脂粉尘掩盖喷射痕迹；试图把悬念引向刀枪道具，却因脂粉色号与针头批次这种「妆容专属痕迹」而无法自洽。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '刀枪道具响亮，针刺沉默——哪一种更符合后台的体面？',
      '孔雀蓝脂粉是谁的私有口音？',
      '锣鼓掩护的三分钟盲区里，谁的脸离开了镜子？',
      '簪子里藏的若是药液，卸妆油的指纹怎会甘心缺席？'
    )
  };
}

export function generateRiverTown(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['沈鹤年', '宋柏舟', '叶仲卿']),
    age: pick(rng, [51, 54, 58]),
    occupation: '药铺掌柜',
    discovery: pick(rng, [
      '雨后石板湿滑，学徒推门只见掌柜倒在柜台旁药碾边，面色青紫却无明显外伤',
      '铺子里残留的苦杏仁气息混着薄荷——更像复方配伍出错而非单纯急症',
      '柜台账本摊开一页「赊欠」，墨迹旁溅了一点尚未干透的药汁'
    ])
  };

  const suspectsBase = [
    {
      name: '沈漱玉',
      gender: 'female',
      age: 34,
      role: '郎中 · 邻铺',
      relation: '常与掌柜会诊',
      surface_motive: pick(rng, ['昨夜两人吵过方剂配伍', '掌柜说他误诊害人']),
      alibi: pick(rng, ['我在自家接诊发烧孩童到天亮', '我在后院煎药']),
      secret: pick(rng, ['私下改过药方牟利', '欠掌柜人情不愿明说']),
      is_killer: false
    },
    {
      name: '杜小川',
      gender: 'male',
      age: 23,
      role: '伙计',
      relation: '学徒期满留用',
      surface_motive: pick(rng, ['昨夜柜台由他收尾但他记不清剂量', '他曾遗失一包雄黄']),
      alibi: pick(rng, ['我打烊后在后院洗漱有人看见', '我在柜台点数铜钱']),
      secret: pick(rng, ['掌柜发现他挪用小款威胁辞退', '私下替人讨债']),
      is_killer: true
    },
    {
      name: '白绮萝',
      gender: 'female',
      age: 29,
      role: '债主之女',
      relation: '讨债常客',
      surface_motive: pick(rng, ['昨夜她来催债不欢而散', '她随身带着一纸利息契约']),
      alibi: pick(rng, ['我在茶楼等到三更有人作证', '我在渡口等人']),
      secret: pick(rng, ['契约伪造过一页骑缝章', '与伙计私下往来']),
      is_killer: false
    },
    {
      name: '贺老三',
      gender: 'male',
      age: 41,
      role: '脚夫',
      relation: '送货',
      surface_motive: pick(rng, ['昨夜送货迟到遭叱骂', '他袖口沾药尘']),
      alibi: pick(rng, ['我在客栈歇脚伙计见过', '我在桥头躲雨']),
      secret: pick(rng, ['走私洋烟帮跑腿', '见过伙计深夜出门']),
      is_killer: false
    },
    {
      name: '柳芸娘',
      gender: 'female',
      age: 46,
      role: '掌柜寡嫂',
      relation: '掌管账本钥匙',
      surface_motive: pick(rng, ['昨夜她与掌柜争执分红', '她有柜台备用钥匙']),
      alibi: pick(rng, ['我在后院绣花灯火通明邻居可见', '我去庙里上香']),
      secret: pick(rng, ['暗中挪用股息还债', '握有伙计短处']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '柜台秤盘残留微量砷化物结晶——却被薄荷油掩盖嗅觉（复方配伍更像刻意遮蔽而非单方误食）',
    '掌柜指甲缝掐出一缕麻黄屑——临死前有剧烈呛咳抓取柜台痕迹',
    pick(rng, ['砚台下水渍晕开一页赊欠名单——字迹停顿像是被迫签下', '碾槽里有不属于今夜批次的硫磺粉尘']),
    pick(rng, ['门板内侧有新指甲划痕——更像熟人反手关门拖延呼救', '屋檐下滴水线旁有被抹布反复擦拭的痕迹'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `称量日志缺失一页——撕痕边缘粉末分层显示砷化物称重先于麻黄入锅十分钟；当晚能把两道秤记录串联的只有值守柜台的${killer.name}`,
    `${killer.name}左手虎口陈旧烫伤疤痕沾到砷化物粉尘擦拭纹——与其声称「整夜未碰毒性药材」背离`,
    `薄荷油罐封口蜡封印有伙计私刻的小记号——掌柜绝不会用这种记号进货`,
    `债主之女证言补丁：伙计昨夜向她索要暂缓措辞草稿——时间点落在掌柜倒地之前二十分钟`,
    `硫磺粉尘批次对应城外走私货源——伙计曾多次夜半往返渡口账簿却被掌柜写下辞退预告`
  ]);

  return {
    title: '江南雨巷',
    setting: pick(rng, ['民国，江南水乡青石巷药铺雨夜', '民国，漕运码头旁药材铺', '民国，梅雨连绵的小镇']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['砷化物配伍诱导急性中毒', '吸入性粉末诱发窒息']),
    motive_truth: `${killer.name}挪用货款被掌柜写成辞退告示并限期补足亏空；伙计利用药理配伍遮蔽砷嗅阈制造「看似误服」的现场，谋求账本销毁窗口。`,
    full_truth:
      '凶手熟知掌柜作息：先用麻黄呛咳混淆砷中毒早期症状，再以薄荷油遮蔽杏仁气味窗口；试图伪装学徒失手，却把称量分层时间线与左手砷尘擦拭纹留在了物的层级。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '杏仁味可以被薄荷收买——谁在嗅觉上动了手脚？',
      '两道秤痕分层十分钟：谁在柜台后面改写时辰？',
      '蜡封记号若是伙计私印，掌柜的茶碗里怎会安然无恙？',
      '硫磺风尘仆仆进城——伙计夜半渡口可否对照账单？'
    )
  };
}

export function generateMuseumNight(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['杜岚', '韩芷', '叶棠']),
    age: pick(rng, [29, 33, 37]),
    occupation: pick(rng, ['夜班策展助理', '藏品数字化专员']),
    discovery: pick(rng, [
      '闭馆红外地毯最后一次触发停在青铜器展区——助理倒在监控死角缝隙',
      '玻璃柜无尘却在底座接缝渗出微量紫外固化胶腥味',
      '死者平板停在藏品 RFID 复核界面——指纹解锁尚未闭合'
    ])
  };

  const suspectsBase = [
    {
      name: '沈曜',
      gender: 'male',
      age: 41,
      role: '文物修复师',
      relation: '馆内聘用',
      surface_motive: pick(rng, ['昨夜他曾独自留在修复室', '他与死者争执藏品出库']),
      alibi: pick(rng, ['我有门禁分段录像只是有部分盲区', '我在库房恒温柜巡检']),
      secret: pick(rng, ['私下承接高仿外包', '欠死者人情']),
      is_killer: false
    },
    {
      name: '黎蔚',
      gender: 'male',
      age: 36,
      role: '夜班安保主管',
      relation: '值守中控',
      surface_motive: pick(rng, ['警报静默他有最高权限', '他与死者发生过排班争执']),
      alibi: pick(rng, ['中控大屏我能复盘轨迹', '我在巡查打卡']),
      secret: pick(rng, ['短暂睡岗不敢上报', '私下有偿帮人绕过安检']),
      is_killer: true
    },
    {
      name: '俞珊',
      gender: 'female',
      age: 33,
      role: '策展协调',
      relation: '死者上司',
      surface_motive: pick(rng, ['她手握展区钥匙分级', '她对舆论公关施压']),
      alibi: pick(rng, ['我在应酬酒会 GPS 可查', '我在办公楼视频会议']),
      secret: pick(rng, ['挪用赞助经费填补窟窿', '害怕赝品丑闻']),
      is_killer: false
    },
    {
      name: '许知行',
      gender: 'male',
      age: 27,
      role: '实习生',
      relation: '协助布展',
      surface_motive: pick(rng, ['昨夜借用死者门禁卡十分钟', '他熟知展区盲区']),
      alibi: pick(rng, ['我在寝室直播写作业', '我与同事语音连线']),
      secret: pick(rng, ['偷拍展区图纸牟利', '欠网贷']),
      is_killer: false
    },
    {
      name: '姚婧',
      gender: 'female',
      age: 44,
      role: '赞助商代表',
      relation: '捐赠方派驻',
      surface_motive: pick(rng, ['要求临时调换展品被拒', '她与死者当面争执估价']),
      alibi: pick(rng, ['我在酒店大堂等候会面记录可查']),
      secret: pick(rng, ['想用赝品顶替避税', '私下贿赂安保放行']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '警报链路静默窗口恰好等于 RFID 复核写入失败的十六秒——不像停电更像指令屏蔽',
    '展柜底座接缝渗出紫外线固化胶气味——更像是馆内耗材而非盗贼撬棍损伤',
    pick(rng, ['死者掌心夹着一枚 RFID 芯片贴膜——贴膜批次写着馆内耗材编码', '电梯摄像捕捉到一段披肩遮住胸牌的背影']),
    pick(rng, ['青铜器展区湿度曲线夜间突变一瞬间恢复——像是恒温柜短开门'], ['保洁推车停在货运电梯口超时'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `中控日志有一条延迟写入的高权限指令——指纹复盘指向${killer.name}值班时段`,
    `紫外胶批次编号绑定馆内耗材申领——申领签字复印件署名仍是${killer.name}`,
    `安保对讲有一段刻意压住通话键的白噪声——目的是遮蔽 RFID 警报蜂鸣写入`,
    `修复室红外证明修复师昨夜确实未曾接近青铜器展区——切断高仿外包的直接联想`,
    `赞助代表贿赂转账备注编码出现在${killer.name}手机镜像备份——死者昨夜拍下截图准备稽核`
  ]);

  return {
    title: '博物馆之夜 · 空柜',
    setting: pick(rng, ['现代，闭馆后的市立博物馆冷白光夜', '现代，临展换位前夕的夜巡', '现代，暴雨夜的地下库区']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['窒息后伪装跌倒撞击', '扼颈致死']),
    motive_truth: `${killer.name}长期有偿放行高仿替换链路并收受赞助代表回扣；死者抓到 RFID 稽核闭环截图准备上报——安保主管只能用静默窗口杀人夺证并伪造盗抢叙事。`,
    full_truth:
      '本案核心是权限痕迹而非撬玻璃：凶手用中控指令屏蔽警报写入窗口，再以紫外胶延时固化遮掩开箱节拍；伪造外人侵入却把馆内耗材批次与指纹复盘留在了日志层级。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '警报失声不一定是耳聋——更像是有人在控制台捂住耳朵。',
      '紫外胶的气味认得馆内库房货架——外人何必用它说谎？',
      '十六秒的 RFID 空洞足够塞进一桩谋杀——钥匙卡在谁的指纹里？',
      '修复师的手今晚有没有摸到青铜器展区？轨迹是最好的证人。'
    )
  };
}

export function generateStudioFire(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['邵惟', '魏岚', '秦屿']),
    age: pick(rng, [39, 43, 47]),
    occupation: pick(rng, ['画廊主', '策展人']),
    discovery: pick(rng, [
      '火势很快被扑灭，尸体俯卧姿态更像俯卧受限而非逃生倒地',
      '鼻腔烟尘量少——更像起火前已失去自主呼吸',
      '墙面上缺失一枚画框挂钩螺丝——原位却有二次钻孔痕迹'
    ])
  };

  const suspectsBase = [
    {
      name: '沈栩',
      gender: 'male',
      age: 34,
      role: '助理画家',
      relation: '死者雇员',
      surface_motive: pick(rng, ['合约分红争执', '昨夜画室由他收尾']),
      alibi: pick(rng, ['我在便利店刷卡买东西', '我在楼下洗车']),
      secret: pick(rng, ['私下临摹署名画作牟利', '欠高利贷']),
      is_killer: true
    },
    {
      name: '孟汀',
      gender: 'male',
      age: 41,
      role: '藏家经纪人',
      relation: '买方中介',
      surface_motive: pick(rng, ['昨夜他来取鉴定报告不欢而散', '他手提防火公文箱']),
      alibi: pick(rng, ['我在会所包厢等人 GPS 可查']),
      secret: pick(rng, ['撮合赝品流转抽佣', '握有死者私下成交录音']),
      is_killer: false
    },
    {
      name: '黎曜',
      gender: 'male',
      age: 37,
      role: '画室管理员',
      relation: '后勤',
      surface_motive: pick(rng, ['通风橱溶剂由他保管', '钥匙权限与他有关']),
      alibi: pick(rng, ['我在夜班岗亭打游戏监控可查']),
      secret: pick(rng, ['私下贩卖稀释剂桶', '短暂离开岗亭']),
      is_killer: false
    },
    {
      name: '乔岚',
      gender: 'female',
      age: 29,
      role: '评论家',
      relation: '舆论施压',
      surface_motive: pick(rng, ['昨夜她与死者通话二十分钟', '她发过匿名爆料']),
      alibi: pick(rng, ['我在直播间连线']),
      secret: pick(rng, ['有偿发稿'], ['曾被死者羞辱']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '起火点残留松节油扩散纹路更像自上而下泼溅而非电线自燃熔滴',
    '尸体袖口有二乙醚挥发残留峰值——常见于短时昏迷诱导而非烟火吸入路径',
    pick(rng, ['缺失画框背面贴纸印着画廊出库条码——条码绑定画作昨夜本该离岸交付'], ['门禁记录有一段刷卡间隔异常短的往返']),
    pick(rng, ['画室垃圾桶检出烧毁一半的临摹签名草稿'], ['窗台外侧防火梯踏板有新擦痕'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `松节油桶封口 RFID 与工作牌的最近一次开锁记录重合——刷卡者是${killer.name}`,
    `二乙醚购入票据拍照上传云端备份——上传终端机型与${killer.name}手机型号一致`,
    `临摹草稿铅笔石墨微量元素匹配死者尚未揭幕油画底料批次——指向助理代工署名链条`,
    `管理员岗亭监控补丁：案发时段曾有九十秒盲区——盲区起始按键日志联动画室门禁远程解锁`,
    `经纪人通话录音末尾捕获远处画室门禁蜂鸣——时间在明火报警之前两分钟`
  ]);

  return {
    title: '画室余烬',
    setting: pick(rng, ['现代，城郊画室仓库改装的工作室夜火', '现代，临江loft画室暴雨夜', '现代，画展前夕通宵赶稿']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['乙醚昏迷后扼颈', '昏迷后钝器击打']),
    motive_truth: `${killer.name}长期代工署名画作牟利即将被离岸交割稽核揭发；画廊主要冻结合约并追责——凶手先用短时昏迷夺取反抗能力，再以纵火毁掉临摹证据原件链。`,
    full_truth:
      '凶手刻意反过来利用「松节油易燃常识」诱导调查朝向意外起火：但真正闭合链条的是昏迷药剂峰值与 RFID 溶剂桶开锁——火光只是销毁署名草稿的最后一道工序。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '烟尘不够呛喉——火是不是迟到了？',
      '泼溅的油有自己的朝向：自燃不爱讲故事。',
      '松节油桶认得你的工作卡——你敢对它发誓吗？',
      '画布底料记着代工的秘密署名——灰烬未必来得及闭嘴。'
    )
  };
}

export function generatePhoneBooth(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['宋琦', '吴昱', '沈棠']),
    age: pick(rng, [27, 31, 35]),
    occupation: pick(rng, ['夜班剪辑师', '外卖站长']),
    discovery: pick(rng, [
      '旧亭地面留下规则的环形水渍——像是重物倒置拖曳留下的冷凝圈',
      '亭内话筒海绵检出极高剂量乙醇擦拭残留——更像销毁唾液样本而非醉酒呕吐',
      '缴费凭证吐出半截——打印时间与失踪推送只差九十秒左右'
    ])
  };

  const suspectsBase = [
    {
      name: '魏铮',
      gender: 'male',
      age: 39,
      role: '电信外包维修',
      relation: '片区线路',
      surface_motive: pick(rng, ['昨夜这片路由由他复位', '他有后台口令']),
      alibi: pick(rng, ['我在机房端口值班日志可查', '我在基站复位告警']),
      secret: pick(rng, ['贩卖通话录音牟利', '赌债']),
      is_killer: false
    },
    {
      name: '顾岚',
      gender: 'female',
      age: 33,
      role: '前女友 · 同业',
      relation: '情感纠葛',
      surface_motive: pick(rng, ['昨夜发过匿名短信威胁', '她知道死者夜班路径']),
      alibi: pick(rng, ['我在健身房刷脸']),
      secret: pick(rng, ['留存死者云端相册镜像口令', '雇佣私家侦探']),
      is_killer: false
    },
    {
      name: '贺骁',
      gender: 'male',
      age: 41,
      role: '冷链站长',
      relation: '死者室友前任雇主',
      surface_motive: pick(rng, ['昨夜冷链车在巷口熄火许久', '他与死者吵过劳资']),
      alibi: pick(rng, ['我在调度中心大屏']),
      secret: pick(rng, ['走私冻品掩护舱温度造假']),
      is_killer: true
    },
    {
      name: '乔棠',
      gender: 'male',
      age: 24,
      role: '便利店夜班',
      relation: '目击者',
      surface_motive: pick(rng, ['监控死角对准巷口', '他与死者相识']),
      alibi: pick(rng, ['我在收银台全程录像']),
      secret: pick(rng, ['私下倒卖号码卡']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '环形水渍边缘冷凝纹路更像冷链箱体倒置短时停靠——与普通雨伞滴水径迹不同',
    '话筒乙醇峰值不像呕吐雾化更像棉签狠擦——指向刻意销毁生物学痕迹',
    pick(rng, ['缴费凭证商户编号绑定冷链子公司代收端口', '巷口沥青有被重物碾压的新鲜延展裂纹']),
    pick(rng, ['死者手表心率在失联窗口骤停两分钟后再抖动——更像外力阻断供血', '亭顶摄像头线缆有新接驳掐痕'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `调度轨迹显示${killer.name}车辆熄火坐标与亭子半径一米重合约九十秒——足以完成拖拽`,
    `冷链箱体 RFID 开锁指纹复盘出现 ${killer.name}右手食指——与话筒擦拭手势吻合`,
    `死者云端相册昨夜备份触发口令登录 IP 归属冷链调度楼——凶手试图销毁劳资纠纷截图`,
    `电信外包日志补丁：接驳掐痕所用快速接头批次只在冷链仓库备货——外包修理工昨夜并未申领`,
    `前女友威胁短信基站握手延迟高于亭子坐标——排除即时在场动手窗口`
  ]);

  return {
    title: '电话亭里的第七声',
    setting: pick(rng, ['现代，旧城拆迁前夕窄巷公用电话亭午夜', '现代，冬雨夜的街口通讯亭', '现代，霓虹背面失灵的智慧城市死角']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['扼颈致死后伪造失联', '胶带封口窒息']),
    motive_truth: `${killer.name}温度造假链被死者截取冷库云端截图准备举报；凶手借夜班冷链停靠死角接近电话亭会面，击杀后倒置箱体冷凝留下环形痕迹试图伪装雨水。`,
    full_truth:
      '此案不要被「第七声铃声」牵着跑——铃声可以是远程触发脚本；真正的闭环在车熄火九十秒量级的时间窗、箱体 RFID 指纹与话筒乙醇销毁三联印证。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '环形水渍若是雨的修辞——冷链倒置就更像动词。',
      '乙醇峰值太高雅：呕吐粗暴，棉签斯文。',
      '九十秒的熄火坐标能把亭子一口吞下——谁在车里按住呼吸？',
      '云端相册昨夜开门迎客——访客 IP 认得哪栋楼的心脏？'
    )
  };
}

export function generateAncientMansion(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['沈鹤廷', '顾秉璋', '沈仲卿']),
    age: pick(rng, [54, 58, 61]),
    occupation: '族长',
    discovery: pick(rng, [
      '祠堂侧厅灯火摇曳，族长倒在家谱架旁，胸口一道细长创口出血缓慢——更像利器精确而非厮打撕裂',
      '门口香灰脚印一进一出断续——内侧印记更深说明负重停留',
      '家谱撕去一页茬口崭新的纤维粘在死者袖口——像是临死扯落'
    ])
  };

  const suspectsBase = [
    {
      name: '沈砚舟',
      gender: 'male',
      age: 31,
      role: '嫡长孙 · 举人',
      relation: '继承人候选',
      surface_motive: pick(rng, ['昨夜祠堂训斥继承人语气严峻', '他被撞见翻动家谱']),
      alibi: pick(rng, ['我在书房背书仆人听见']),
      secret: pick(rng, ['私下欠债押田契']),
      is_killer: false
    },
    {
      name: '顾嬷嬷',
      gender: 'female',
      age: 52,
      role: '内宅管事',
      relation: '服侍三十年',
      surface_motive: pick(rng, ['掌握祠堂钥匙一串', '她与族长口角']),
      alibi: pick(rng, ['我在绣楼点灯到天明']),
      secret: pick(rng, ['隐瞒嫡庶调换传言']),
      is_killer: false
    },
    {
      name: '沈栖梧',
      gender: 'male',
      age: 44,
      role: '庶务总管',
      relation: '外姓入赘管家',
      surface_motive: pick(rng, ['昨夜库房钥匙由他清点', '死者当众否定他的账目']),
      alibi: pick(rng, ['我在账房算盘珠子打到三更']),
      secret: pick(rng, ['挪用宗族祀田租金']),
      is_killer: true
    },
    {
      name: '柳刀匠',
      gender: 'male',
      age: 49,
      role: '上门磨刀匠',
      relation: '外来匠人',
      surface_motive: pick(rng, ['他的磨刀石昨夜湿润', '死者生前呵斥他喧哗']),
      alibi: pick(rng, ['我在门房等候打赏天亮']),
      secret: pick(rng, ['私下替总管锻造薄刃小刀']),
      is_killer: false
    },
    {
      name: '玄寂',
      gender: 'male',
      age: 58,
      role: '祠堂香火道士',
      relation: '外人住持',
      surface_motive: pick(rng, ['昨夜香火断续三次', '他与族长谈过祭祀变革']),
      alibi: pick(rng, ['我在偏殿念经']),
      secret: pick(rng, ['收受总管馈赠']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '创口细长出血缓慢——更像剃刀薄刃一击避开肋骨缝隙的专业取向',
    '撕去家谱茬口沾墨——墨迹分层显示曾被第二次蘸墨按压遮盖骑缝署名',
    pick(rng, ['香灰脚印内侧更深且有拖拽回旋——不像慌乱逃生更像背负沉重簿册', '祖宗牌位底座有被挪动微尘弧线']),
    pick(rng, ['死者拇指缝隙夹着一缕蚕丝绳屑——祠堂账本捆绳用料', '烛泪滴落间断三次——对应香火断续节拍'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `磨刀匠账本记着「薄刃小刀一式」提货签字画押押的是${killer.name}私印纹样`,
    `祀田账目缺失那一页的骑缝指纹残留墨粉显微比对指向${killer.name}拇指斗箕`,
    `香火道士补丁：总管昨夜赠送的香锭批次昂贵——与他声称俸禄微薄背离`,
    `嫡长孙口述补丁：家训诵读未曾间断——反向切断举人持刀潜入祠堂动机峰值`,
    `蚕丝绳屑与账房独有捆札手法吻合——总管昨夜声称未曾踏入祠堂却在捆绳留下技能指纹`
  ]);

  return {
    title: '古宅灯影',
    setting: pick(rng, ['古代，宗族祠堂秋雨夜', '古代，山城合族祖宅子时', '古代，江南水乡望族']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['剃刀薄刃刺穿心包', '精准切割颈动脉']),
    motive_truth: `${killer.name}挪用祀田租金并伪造家谱骑缝署名想把嫡庶调换做实；族长昨夜当众焚稿稽查账本——总管只能用薄刃静默击杀并带走缺失页遮掩账目黑洞。`,
    full_truth:
      '脚印一进一出背负的不是尸体而是账册：凶手利用香火断续熄灭烛光掩护翻阅家谱撕页；剃刀创口取向暴露匠人订制闭环与总管私印提货笔录。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '一刀细长——更像匠人丈量肋骨缝隙的手艺。',
      '家谱墨迹分层藏着第二次说谎：谁在骑缝里按下指纹？',
      '脚印深浅不一致：谁在离开时背负的不只是慌乱？',
      '磨刀匠账本里的私印纹样——为谁量身定制薄刃？'
    )
  };
}

export function generateMountainInn(rng, suspectCount) {
  /* 独立暴风雪山栈逻辑链：炉熄火 + 储物间密室窗口 */
  const victim = {
    name: pick(rng, ['贺远征', '沈岚', '陶砚']),
    age: pick(rng, [34, 39, 44]),
    occupation: pick(rng, ['登山向导', '摄影师']),
    discovery: pick(rng, [
      '暴雪间歇有人发现他倒在储物间门内，外门槛积雪却无搏斗踩踏波纹',
      '暖炉熄火时间与胃部尚有温度的茶水不一致——更像人为切断供暖诱导走动',
      '门槛雪层断开一处细长凹槽——像绳索牵拉门板留下的挤压痕'
    ])
  };

  const suspectsBase = [
    {
      name: '邢砚秋',
      gender: 'male',
      age: 42,
      role: '客栈掌柜',
      relation: '经营者',
      surface_motive: pick(rng, ['昨夜强调不要报警', '他与死者争执房价']),
      alibi: pick(rng, ['我在大堂算账伙计盯着']),
      secret: pick(rng, ['走私腊肉过境藏匿冷库']),
      is_killer: false
    },
    {
      name: '穆岑',
      gender: 'male',
      age: 37,
      role: '锅炉工',
      relation: '供暖维护',
      surface_motive: pick(rng, ['昨夜供暖曲线骤降由他复位', '死者追问管线改动']),
      alibi: pick(rng, ['我在锅炉房铲碳']),
      secret: pick(rng, ['私自卖掉温控探头牟利']),
      is_killer: true
    },
    {
      name: '黎笙',
      gender: 'female',
      age: 29,
      role: '前台',
      relation: '登记入住',
      surface_motive: pick(rng, ['她把储物间备用钥匙挂在显眼钩上', '她与死者曾有争执']),
      alibi: pick(rng, ['我在前台追剧一整夜']),
      secret: pick(rng, ['私自复制钥匙卖掉']),
      is_killer: false
    },
    {
      name: '柯湛',
      gender: 'male',
      age: 33,
      role: '住客 · 测绘师',
      relation: '外人',
      surface_motive: pick(rng, ['昨夜他去过后院雪地脚印很深', '他携带绳索']),
      alibi: pick(rng, ['我在房顶测量积雪荷载']),
      secret: pick(rng, ['偷拍山体滑坡预警牟利']),
      is_killer: false
    },
    {
      name: '桑芷',
      gender: 'female',
      age: 26,
      role: '厨娘',
      relation: '后勤',
      surface_motive: pick(rng, ['茶水由她送入大堂', '她与锅炉工同乡']),
      alibi: pick(rng, ['我在灶间和面']),
      secret: pick(rng, ['听过死者追问温控日志']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '暖炉温控探头读数骤降两分钟回升——更像远程回路短路而非暴雪偶发失压',
    '储物间门槛积雪断开凹槽边缘有尼龙纤维拉丝——不像动物拖拽更像绳索牵拉门板',
    pick(rng, ['茶水残留温度推算倾倒时间与供暖骤降拐点重合', '后院铲雪痕迹里有半截温控探头保修条码']),
    pick(rng, ['储物间门锁内侧划痕同心圆——像是内侧旋钮被动过', '屋檐冰锥折断节拍与门板牵拉声吻合'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `温控维保扫码最后一次签到手机号实名绑定${killer.name}——与他声称整夜铲碳口径背离`,
    `锅炉灰堆里检出烧焦的温控探头焊脚批次——对应骤降两分钟短路源头`,
    `绳索纤维与锅炉房常备麻绳防腐剂涂层一致——牵拉门板制造密室假象`,
    `测绘师绳索为超高分子聚乙烯——与尼龙拉丝不符——反向切断外人拖拽假设`,
    `厨娘证言补丁：死者追问温控日志时间点落在骤降前两小时——触动凶手灭口峰值`
  ]);

  return {
    title: '雪夜山栈',
    setting: pick(rng, ['现代，暴雪封山的山野客栈深夜', '现代，盘山公路中断的山栈凌晨', '现代，林场检查站旁的木屋旅店']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['扼颈后伪装低温休克', '一氧化碳短时诱导跌倒']),
    motive_truth: `${killer.name}私自变卖温控探头导致隐性漏电隐患被死者抓取维保扫码实名截图准备索赔举报——凶手切断供暖诱骗死者进入储物间会面杀死后用绳索牵拉门板压实积雪伪造密室断续脚印。`,
    full_truth:
      '暴雪是真，密室是假：牵拉门板压实门槛积雪制造断续踩踏盲区；但真正闭合链条的是温控骤降两分钟短路焊脚残留在锅炉灰堆与维保扫码手机号实名制。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '温控骤降两分钟——暴雪只是旁白还是有人在短路心跳？',
      '尼龙拉丝不肯认错——聚乙烯绳子凭什么顶罪？',
      '密室常常是拉力把戏：门板压低积雪的声音听得像谁在喘气。',
      '维保扫码实名制认得手机号——它会替你喊出夜班铲炭的真名吗？'
    )
  };
}

export function generateDomesticHome(rng, suspectCount, variant = 'foyer') {
  const meta = {
    foyer: {
      title: '午夜玄关',
      setting: pick(rng, ['现代，城市高层住宅雨夜', '现代，商住两用小高层', '现代，老旧小区改装智能锁'])
    },
    neighbor: {
      title: '对门猫眼不说话',
      setting: pick(rng, ['现代，一梯两户公寓', '现代，廉租改公寓', '现代，江景板楼'])
    },
    villa: {
      title: '郊墅周末宴',
      setting: pick(rng, ['现代，近郊独栋雪夜', '现代，露营风郊墅暴雨', '现代，温泉别院周末'])
    }
  };
  const m = meta[variant] || meta.foyer;

  const victim = {
    name: pick(rng, ['林苇', '宋宜', '陶予安']),
    age: pick(rng, [29, 33, 36, 41]),
    occupation: pick(rng, ['室内设计师', '远程财务', '自媒体主理人']),
    discovery: pick(rng, [
      '玄关感应灯亮着，人倒在鞋柜旁，地毯上有一滴溅开极不自然的血',
      '门内安全链半挂，外卖袋仍在桌边——人却再也没起来应门',
      '智能锁 APP 推送过「门外有人长时间逗留」后被手动标为误报'
    ])
  };

  const suspectsBase = [
    {
      name: '沈澈',
      gender: 'male',
      age: pick(rng, [30, 34, 37]),
      role: variant === 'villa' ? '宴客同伴' : '同居伴侣',
      relation: '情感共同生活',
      surface_motive: pick(rng, ['昨夜吵过智能家居预算', '死者曾说要分手', '争执过是否装监控']),
      alibi: pick(rng, ['我在卧室戴耳机开会', '我在阳台打电话到深夜', '我在地库泊车后走消防梯上楼']),
      secret: pick(rng, ['私下借贷', '拷贝过死者云盘相册', '与对门打过照面']),
      is_killer: false
    },
    {
      name: '唐砚',
      gender: 'male',
      age: pick(rng, [35, 39, 42]),
      role: variant === 'villa' ? '邻栋业主' : '楼上邻居',
      relation: '同楼',
      surface_motive: pick(rng, ['做过智能门锁安装评测博主', '昨夜电梯里与死者对视过', '门口曾堆过同款快递箱']),
      alibi: pick(rng, ['我在家直播拆箱到一点', '我在楼梯间抽烟', '我在物业群解释过异响']),
      secret: pick(rng, ['私配过同品牌备用门卡测试', '欠死者一笔人情', '掌握死者入户密码试错记录']),
      is_killer: true
    },
    {
      name: '赵桂枝',
      gender: 'female',
      age: pick(rng, [51, 55, 58]),
      role: '物业管家',
      relation: '楼栋服务',
      surface_motive: pick(rng, ['有全屋紧急钥匙权限', '昨夜被投诉噪音后上来过']),
      alibi: pick(rng, ['我在前台值班大屏', '我在另一栋送水', '我在巡更打卡']),
      secret: pick(rng, ['私下卖过门禁卡空白贴', '帮业主代签过快递']),
      is_killer: false
    },
    {
      name: '贺峥',
      gender: 'male',
      age: pick(rng, [33, 36]),
      role: '前男友',
      relation: '前任',
      surface_motive: pick(rng, ['三天前出现过楼下', '死者拉黑过其号码']),
      alibi: pick(rng, ['我在网约车载客记录可查', '我在机场接人']),
      secret: pick(rng, ['曾偷拍过门禁密码手势', '欠赌债']),
      is_killer: false
    },
    {
      name: '刘小满',
      gender: 'male',
      age: pick(rng, [24, 27]),
      role: '外卖骑手',
      relation: '配送',
      surface_motive: pick(rng, ['订单显示放门口拍照', '他曾被投诉送错单元']),
      alibi: pick(rng, ['我连续跑单到凌晨', '我有定位轨迹']),
      secret: pick(rng, ['私下帮业主带过钥匙', '与对门打过照面']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '智能锁日志显示：昨日 23:41 有一次「胁迫指纹未通过」紧接着 23:43 室内侧手动开锁',
    pick(rng, ['电梯厅监控在 23:38-23:44 缺失关键帧——像是云同步被远程暂停', '猫眼视频云备份少了一截五分钟的缓存']),
    pick(rng, ['地毯血滴形状偏斜，像有人弯腰时指尖滴落而非喷溅', '玄关香薰机被误触成高频档，掩盖过短促争执声'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `同品牌门锁工程模式记录里出现一次「临时母卡写入」——MAC 地址与${killer.name}评测用工程机吻合`,
    `${killer.name}门口鞋架底灰与死者玄关尘样同位素异常一致——说明近期有过高频串门而非偶遇`,
    '骑手 APP 头盔摄像头边角拍到：当晚有人穿同款卫衣在对门前弯腰刷卡——身形偏窄肩',
    '物业机房补丁：门禁抓拍缺口正好落在云端心跳中断时段——中断口令来源指向高层住户路由器 hijack',
    '死者手机里有一条未发送草稿：「他知道我改了管理员权限——」'
  ]);

  return {
    title: m.title,
    setting: m.setting,
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['扼颈后伪装室内意外跌倒', '钝器击打后布置成滑倒']),
    motive_truth: `${killer.name}利用工程母卡与评测职业便利复写门锁权限；死者发现其私自进出并威胁公开——凶手在送餐与会议空白窗进入玄关灭口并伪造成情感纠纷现场。`,
    full_truth:
      '智能锁不会像人那样犹豫：缺口在工程模式、云端抓怕与鞋架微尘三处咬合。邻里的熟稔是最危险的钥匙——它让暴力进门的动作轻得像串门。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '门锁日志里，哪一次「人」在跟机器合谋？',
      '五分钟视频缺口是雨点还是有人在掐断云？',
      '血滴落在弯腰高度——谁那天晚上必须低头？',
      '工程母卡的 MAC 地址会写谁的名字？'
    )
  };
}

export function generateXianxia(rng, suspectCount, variant = 'sword') {
  const meta = {
    sword: {
      title: '剑冢啸鸣夜',
      setting: pick(rng, ['架空，东海剑宗禁地月夜', '架空，霜峰剑冢雷鸣前夜', '架空，辟谷期试炼前夕'])
    },
    pill: {
      title: '丹炉余温杀人',
      setting: pick(rng, ['架空，内门丹堂子夜', '架空，丹霞谷地火房', '架空，秘境小洞天丹室'])
    },
    library: {
      title: '藏经阁缺页',
      setting: pick(rng, ['架空，主峰藏经阁烛海夜', '架空，封印层回廊', '架空，灵潮涨落时'])
    }
  };
  const m = meta[variant] || meta.sword;

  const victim = {
    name: pick(rng, ['顾寒章', '沈照夜', '萧断云']),
    age: pick(rng, [52, 56, 61]),
    occupation: pick(rng, ['执法长老', '刑堂首座']),
    discovery: pick(rng, [
      '倒于石碑前，面色青灰而衣袍无破口——像内息被人生生掐断',
      '指尖扣着一页残角批注，墨迹新得与昨夜星象录异象同刻',
      '剑阵余波未散，地上却有一道不属本门剑路的浅弧'
    ])
  };

  const suspectsBase = [
    {
      name: '陆观雪',
      gender: 'male',
      age: pick(rng, [22, 25, 28]),
      role: '首席真传',
      relation: '弟子',
      surface_motive: pick(rng, ['昨夜被罚面壁却离峰', '死者曾扣押其本命剑']),
      alibi: pick(rng, ['我在剑坪演武到三更', '我在后山随侍师尊']),
      secret: pick(rng, ['私下练过禁剑式', '欠丹堂一批灵石']),
      is_killer: false
    },
    {
      name: '温青萝',
      gender: 'female',
      age: pick(rng, [44, 48]),
      role: '丹堂首座',
      relation: '同门',
      surface_motive: pick(rng, ['丹房余温异常', '死者近期查过丹册']),
      alibi: pick(rng, ['我在炼丹封炉未曾离火', '我在观星台对药']),
      secret: pick(rng, ['炼过克灵毒散', '私改丹籍账册']),
      is_killer: true
    },
    {
      name: '谢无衣',
      gender: 'male',
      age: pick(rng, [36, 40]),
      role: '剑侍',
      relation: '近侍',
      surface_motive: pick(rng, ['握有剑冢钥符', '昨夜替长老送过剑盒']),
      alibi: pick(rng, ['我在剑廊擦拭法剑', '我在外峰传令']),
      secret: pick(rng, ['曾被死者斥责', '偷抄过剑诀残页']),
      is_killer: false
    },
    {
      name: '慕远舟',
      gender: 'male',
      age: pick(rng, [33, 37]),
      role: '藏经阁执事',
      relation: '典籍',
      surface_motive: pick(rng, ['缺页索引经他之手', '他与丹堂往来甚密']),
      alibi: pick(rng, ['我在抄经阁点灵灯', '我在封层守门']),
      secret: pick(rng, ['暗中交易禁目', '握有长老把柄']),
      is_killer: false
    },
    {
      name: '晏长离',
      gender: 'male',
      age: pick(rng, [29, 32]),
      role: '客峰使者',
      relation: '外宗',
      surface_motive: pick(rng, ['昨夜求见被拒', '身带破界符']),
      alibi: pick(rng, ['我在迎宾殿等回执', '我在山道观星']),
      secret: pick(rng, ['奉命取回密约', '与丹堂有过夜路交易']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '尸身灵脉逆流如针刺——不像剑伤更像丹毒逆冲',
    pick(rng, ['丹炉灰烬里有一粒未熔尽的青磷苗', '石碑裂痕旁落着丹灰指印']),
    pick(rng, ['剑痕浅弧与宗门七大式皆不契合', '藏经残角批注字迹与某人研墨习惯一致'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `丹毒残谱缺页边缘药粉与${killer.name}私藏丹瓶同批号`,
    `封炉时辰记录被指尖抹糊那一格——与死者断气时刻相差半炷香，正是${killer.name}称「添火」的窗口`,
    '剑侍剑盒衬布残留清苦丹息——来源不是剑油而是克灵散挥散',
    '客峰使者破界符未曾启封——反向排除外宗瞬杀',
    '首席真传剑穗上无逆行血沫——排除当夜近身利刃刺杀主路径'
  ]);

  return {
    title: m.title,
    setting: m.setting,
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['丹毒逆冲封脉', '灵息暗断心窍']),
    motive_truth: `${killer.name}私炼克灵散并改丹籍平账；执法长老昨夜持批注暗访丹堂准备上峰告发——凶手借送药/封炉Routine 在剑冢风口让丹毒借星象逆流灌入经脉，借剑鸣掩去最后一声呻吟。`,
    full_truth:
      '剑冢啸鸣是障眼法：真正的刀是「药性」与时间差。石碑与剑阵把调查诱向刀剑争锋，却在丹灰指印与封炉抹时两处同时反扣住执炉人的手。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '灵脉逆流像剑气还是像药力在翻江？',
      '封炉记录被抹的那半炷香，谁离火最近？',
      '浅弧剑痕是否是刻意画的箭头误导？',
      '缺页残角想把目光引向藏经还是丹堂？'
    )
  };
}

export function generateCampusNight(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['邵昀', '魏岚', '赵岑']),
    age: pick(rng, [38, 42, 46]),
    occupation: pick(rng, ['高三竞赛教练', '实验室管理员']),
    discovery: pick(rng, [
      '投影仪仍在循环一页教案，讲台上讲义边角有血指纹一枚',
      '教室后门插销从内落下——外人闯入叙事说不通',
      '储物柜顶层试剂标签被人匆忙撕掉一角'
    ])
  };

  const suspectsBase = [
    {
      name: '姜屿',
      gender: 'male',
      age: 17,
      role: '尖子生',
      relation: '学生',
      surface_motive: pick(rng, ['昨夜被留堂', '与死者争过保送名额']),
      alibi: pick(rng, ['我在自习室背书到十一点', '我去厕所时有人同行的记忆模糊']),
      secret: pick(rng, ['偷配过实验室钥匙', '作弊链被死者掌握']),
      is_killer: true
    },
    {
      name: '沈清嘉',
      gender: 'female',
      age: 27,
      role: '青年教师',
      relation: '同事',
      surface_motive: pick(rng, ['申请经费被拒', '昨夜来找死者签字']),
      alibi: pick(rng, ['我在办公室写教案监控可查']),
      secret: pick(rng, ['私下挪用耗材']),
      is_killer: false
    },
    {
      name: '许韬',
      gender: 'male',
      age: 40,
      role: '门卫',
      relation: '值守',
      surface_motive: pick(rng, ['教学楼钥匙一串在他手里', '他曾放行维修工']),
      alibi: pick(rng, ['我在门卫室看电视']),
      secret: pick(rng, ['瞌睡十分钟']),
      is_killer: false
    },
    {
      name: '陈砚声',
      gender: 'male',
      age: 18,
      role: '班长',
      relation: '学生',
      surface_motive: pick(rng, ['昨夜返回教室取书包']),
      alibi: pick(rng, ['我和两名同学一起走']),
      secret: pick(rng, ['替姜屿销毁过小纸条']),
      is_killer: false
    },
    {
      name: '霍婧',
      gender: 'female',
      age: 35,
      role: '保洁',
      relation: '后勤',
      surface_motive: pick(rng, ['十点后进入过走廊']),
      alibi: pick(rng, ['我在清运垃圾']),
      secret: pick(rng, ['看见学生从侧门溜走']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '黑板最末一行公式多了一道未干指血拖尾',
    '通风橱里有一瓶强酸盖子虚掩，台面 pH 试纸呈异常梯度',
    pick(rng, ['侧门门禁有一学生卡刷记录与熄灯冲突', '讲台抽屉里夹着半张泄题照片'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `${killer.name}实验服袖口纤维与强酸瓶盖内圈唇印显微一致`,
    `监控补帧显示：后门插销落下时走廊只有${killer.name}鞋印折返`,
    '泄题照片元数据创建者终端名与尖子生平板同步',
    '竞赛教练记事本写着「今夜与 G 了结」——G 字迹与尖子生姓氏首拼暗合',
    '青年教师办公室打印日志无该时段——排除其临场封门'
  ]);

  return {
    title: '晚自习教室十一点',
    setting: pick(rng, ['现代，寄宿中学教学楼深夜', '现代，重点高中竞赛楼', '现代，城郊国际学校']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['化学灼伤吸入致死', '窒息后伪装跌倒']),
    motive_truth: `${killer.name}作弊链将被保送名额复核揭发；死者手握证据准备连夜上报——尖子生利用实验室权限配制挥发性损伤场景反锁后门伪造第三人叙事。`,
    full_truth:
      '教案投影仍在循环，是因为凶手希望所有人记住「老师在讲课」——真正的课程在通风橱与插销之间完成，时间线一寸寸合上时，尖子生的「优秀」碎了。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '后门内落锁：谁在门里收了尾？',
      '指血公式写给谁看——羞辱还是求救？',
      '强酸瓶盖唇印讲的是哪一种慌乱？',
      '泄题照片是谁的设备生下来？'
    )
  };
}

export function generateCorporateLift(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['蒋曜', '沈恪', '陶岚']),
    age: pick(rng, [36, 40, 44]),
    occupation: pick(rng, ['项目总监', '产品合伙人']),
    discovery: pick(rng, [
      '卡在 B2 与一层之间的电梯夹层踏板旁呼吸已停——像是被人诱导踏入维保盲区',
      '工牌绳断裂处有二次拉扯摩擦痕',
      '口袋硬盘外壳留有防静电指套压纹'
    ])
  };

  const suspectsBase = [
    {
      name: '宋以宁',
      gender: 'female',
      age: pick(rng, [33, 37]),
      role: '维保对接人',
      relation: '乙方',
      surface_motive: pick(rng, ['昨夜递交过停梯申请', '掌握急停口令']),
      alibi: pick(rng, ['我在机房与工程师视频', '我在另一栋楼例行保养']),
      secret: pick(rng, ['收受外包红包', '临时把急停写入写程器']),
      is_killer: true
    },
    {
      name: '白栀',
      gender: 'female',
      age: pick(rng, [29, 32]),
      role: '直属下属',
      relation: '项目组',
      surface_motive: pick(rng, ['被裁名单里她排第一', '与总监吵过交付']),
      alibi: pick(rng, ['我在工位打卡到十二点', '我有同事连麦']),
      secret: pick(rng, ['偷拷过机密需求文档']),
      is_killer: false
    },
    {
      name: '周景行',
      gender: 'male',
      age: pick(rng, [45, 49]),
      role: '行政主管',
      relation: '风控',
      surface_motive: pick(rng, ['掌握全楼卡权限', '昨晚批过访客条']),
      alibi: pick(rng, ['我在会议到十点离场录像']),
      secret: pick(rng, ['把监控保留期改短']),
      is_killer: false
    },
    {
      name: '柯明',
      gender: 'male',
      age: pick(rng, [38, 42]),
      role: '竞品卧底',
      relation: '外包',
      surface_motive: pick(rng, ['昨夜与死者同梯上', '背着黑色工具包']),
      alibi: pick(rng, ['我在地下车库等人']),
      secret: pick(rng, ['与总监有勒索往事']),
      is_killer: false
    },
    {
      name: '林晚',
      gender: 'female',
      age: pick(rng, [26, 30]),
      role: '夜班保安',
      relation: '安保',
      surface_motive: pick(rng, ['手动松过闸一次', '熟悉梯井通道']),
      alibi: pick(rng, ['我在大堂巡逻']),
      secret: pick(rng, ['睡岗']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '电梯黑匣子记录一次 0.7s 急停抖动——时间与总监工牌最后一次感应差 41 秒',
    '夹层地面有防静电指套碎片，批次只供乙方运维领用',
    pick(rng, ['停梯申请单签字时间被墨水洇染', '车库监控出现同品牌工具包往返梯间两次'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `写程器 USB 序列号绑定${killer.name}工号——急停脚本非「偶发故障」`,
    `总监口袋硬盘最后写入 IP 指向${killer.name}临时热点名称`,
    '直属下属打卡与电梯事件无交叠——削弱情杀叙事',
    '行政主管访客条未出现乙方工程机编号——反向锁口',
    '竞品卧底工具包打开无写程接口——排除其亲写急停'
  ]);

  return {
    title: '截止日电梯井',
    setting: pick(rng, ['现代，CBD 甲级写字楼深夜', '现代，科技园双子塔', '现代，金融中心副楼']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['诱入夹层后扼颈', '梯井踏空致死']),
    motive_truth: `${killer.name}收受返点并篡改验收；总监昨夜持硬盘准备向总部举报——维保对接人写入急停脚本制造「事故窗口」在夹层灭口夺回证据。`,
    full_truth:
      '电梯从不说谎，除非有人动黑匣子：0.7 秒抖动是有人把「谋杀」写成「故障」。防静电指套碎屑与写程器序列把乙方的手推回光下。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '急停抖动像机械衰老还是像一行代码？',
      '谁的手指需要指套去见硬盘？',
      '夹层不是意外爱去的地方——谁有理由引他下去？',
      '写程器序列号写的是工号还是良心？'
    )
  };
}

export function generateScifiPod(rng, suspectCount) {
  const victim = {
    name: pick(rng, ['方舟', '凌启', '沈衡']),
    age: pick(rng, [31, 35, 39]),
    occupation: pick(rng, ['轨道工程师', '生命维持系统值班']),
    discovery: pick(rng, [
      '休眠舱压力曲线出现三秒平顶——像有人手动覆写阀门开度',
      '舱内壁凝露分布异常：更像短暂失压而非系统自稳',
      '个人终端最后一条草稿：「备份里有人改过呼吸混合比」'
    ])
  };

  const suspectsBase = [
    {
      name: '柯渡',
      gender: 'male',
      age: pick(rng, [33, 37]),
      role: '生保二副',
      relation: '同舱组',
      surface_motive: pick(rng, ['昨夜值班日志他签过字', '与死者竞聘同一岗位']),
      alibi: pick(rng, ['我在中控看板前三小时', '我有同事换班记录']),
      secret: pick(rng, ['私下卖过休眠位次', '掌握覆写口令碎片']),
      is_killer: true
    },
    {
      name: '阮星',
      gender: 'female',
      age: pick(rng, [28, 32]),
      role: '医官',
      relation: '医务',
      surface_motive: pick(rng, ['给死者开过镇静', '昨夜进过医疗舱']),
      alibi: pick(rng, ['我在急救演练', '我有生命体征监护留痕']),
      secret: pick(rng, ['数据镜像被截断']),
      is_killer: false
    },
    {
      name: '魏川',
      gender: 'male',
      age: pick(rng, [41, 45]),
      role: '船长',
      relation: '指挥',
      surface_motive: pick(rng, ['下令推迟深空跃迁', '与死者争执过补给']),
      alibi: pick(rng, ['我在舰桥联席', '我有黑匣子旁证']),
      secret: pick(rng, ['瞒报过一起小事故']),
      is_killer: false
    },
    {
      name: '吕景',
      gender: 'male',
      age: pick(rng, [36, 40]),
      role: 'AI 管维',
      relation: '算法',
      surface_motive: pick(rng, ['昨夜推送过一次 OTA', '死者反对全仓更新']),
      alibi: pick(rng, ['我在机房回滚补丁']),
      secret: pick(rng, ['留过后门账号']),
      is_killer: false
    },
    {
      name: '霍砂',
      gender: 'female',
      age: pick(rng, [27, 30]),
      role: '实习生',
      relation: '见习',
      surface_motive: pick(rng, ['误触过手动阀盖板', '与死者同住生活舱']),
      alibi: pick(rng, ['我在仿真舱刷题']),
      secret: pick(rng, ['拍过阀门照片发网盘']),
      is_killer: false
    }
  ];

  const allSuspects = deepClone(suspectsBase);
  const killerIndex = allSuspects.findIndex(s => s.is_killer);
  const ensured = ensureKillerIncluded(allSuspects, killerIndex, suspectCount);
  const suspects = ensured.suspects;
  const ki = ensured.killer_index;
  const killer = suspects[ki];

  const initialClues = shuffleInPlace(rng, [
    '三秒平顶与氧气混合比日志不同步——像有人插入一条「人工呼吸」伪装',
    pick(rng, ['星历跃迁倒计时与舱内时钟漂移三秒对齐', '冷凝水盐分梯度指向短时低压']),
    pick(rng, ['备份 RAID 有一块镜像离线窗口', 'AI 语音助手昨夜播报过一次虚构的气闸测试'])
  ]).slice(0, 3);

  const hiddenClues = shuffleInPlace(rng, [
    `手动阀盖板内侧静电粉末与${killer.name}手套涂层同源`,
    `覆写口令哈希拼接片段落在${killer.name}私人密钥卡的缓存碎片`,
    '医官镇静处方与死者代谢峰值错位——削弱医务下手路径',
    'AI OTA 回滚窗口与生保值班重叠——反向追问谁在机上按下覆写',
    '实习生网盘阀门照片拍摄角只在管路检修廊可行——其时${killer.name}登记巡检'
  ]);

  return {
    title: '休眠舱误差三秒',
    setting: pick(rng, ['近未来，地月拉格朗日中转站', '近未来，深空前哨休眠层', '近未来，方舟世代飞船中段']),
    victim,
    killer_index: ki,
    kill_method: pick(rng, ['诱导短时失压窒息', '混合气比例暗改致死']),
    motive_truth: `${killer.name}倒卖休眠配额与补给黑账将被工程部审计；死者昨夜从备份拉出覆写指纹准备对舰长简报——二副利用三秒星历漂移窗口覆写阀门开度伪装系统偶发，吞没指证。`,
    full_truth:
      '宇宙安静得残忍，三秒足够杀一个人：平顶曲线是温柔的刀。静电粉末与哈希碎片不靠喊叫，只靠把人的手从「系统」里抠出来。',
    suspects,
    initial_clues: initialClues,
    hidden_clues: hiddenClues,
    deduction_focus: axes(
      '三秒是星历漂移还是有人在借钟？',
      '凝露盐分是在说失压还是在说慌？',
      '覆写口令不会自己走路——谁拼得出完整一句？',
      'AI 播报的虚构测试掩护了谁的呼吸？'
    )
  };
}

/** 同一 URL seed 下，不同剧本/难度仍岔开随机流，避免「换皮不换数」 */
function burnRngStream(rng, scriptId, salt) {
  const mix = String(scriptId) + String(salt ?? '');
  let h = 0x811c9dc5;
  for (let i = 0; i < mix.length; i++) {
    h ^= mix.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  const n = 9 + (h % 29);
  for (let i = 0; i < n; i++) rng();
}

/** 打乱嫌疑人展示顺序，真凶索引随之重映射（线索里仍用姓名指涉，不受影响） */
function permuteSuspectsForUi(rng, suspects, killerIndex) {
  if (!Array.isArray(suspects) || suspects.length < 2) return { suspects, killer_index: killerIndex };
  const killer = suspects[killerIndex];
  const copy = suspects.slice();
  shuffleInPlace(rng, copy);
  let ki = copy.indexOf(killer);
  if (ki < 0) ki = killerIndex;
  const n = copy.length;
  if (n > 1 && rng() < 0.62) {
    const rot = Math.floor(rng() * n);
    const rotated = copy.slice(rot).concat(copy.slice(0, rot));
    ki = (ki - rot + n) % n;
    return { suspects: rotated, killer_index: ki };
  }
  return { suspects: copy, killer_index: ki };
}

/** 指控真相对错之后给玩家的情绪收束（占位：$WRONG $WRONG_ROLE $KILLER $KILLER_ROLE） */
function attachVerdictEpilogues(data, rng) {
  const killer = data.suspects[data.killer_index];
  const killerName = killer.name;
  const killerRole = killer.role;

  const c1 = pick(rng, [
    `裁断落下：${killerName}（${killerRole}）在物证与供词夹缝里无处遁形。收押后，${killerName}再没能碰到证物袋与原始账册——那一页被撕开的真相，终于被钉回卷宗。`,
    `「凶手」二字终于扣在该扣的人腕上：${killerName}伏法。刑名落定，至少今夜有人不必再给门上加第二道锁。`,
    `公堂（或讯问室的灯）照到尽头：${killerName}承认了自己如何把机会、权限与恶意缝成同一把刀。笔迹落下，故事才从「悬疑」退回人间秩序。`,
    `${killerName}的辩词在最后一环崩断：${killerRole}这层皮再也遮不住指纹、里程与权限。你递出的不是猜测，是一串能把人钉住的坐标。`,
    `收网时 ${killerName}还想笑，笑到一半就僵住了——原来「没人知道」只是没人愿意说。你让愿意开口的人，重新站回光亮处。`
  ]);
  const c2 = pick(rng, [
    `无辜者陆续卸下重负：有人回到旧职时手还在轻颤，有人换了号码与住址，但不必再在走廊里躲你的目光——他们终于从「嫌疑人」三个字里走出来。`,
    `被误伤过的信任会慢慢结痂：合作恢复得慢，却不再像走钢丝。有人选择离开这座城，也有人留下，把窗帘重新拉开。`,
    `其余在场者拿回了自己的名字：证词不必再排练，睡梦里也不会再听见自己的心跳像警钟。`,
    `有人给被你问过话的证人递了杯热水——那杯水的温度，比任何褒奖都诚实：他们知道自己活回来了。`,
    `最轻的那口气，往往出在真凶之外：孩子敢把作业本摊在桌上，老人敢在小区长椅坐到天黑。你替他们守住了「普通的一天」。`
  ]);
  const c3 = pick(rng, [
    `至于 ${killerName}：候审、宣判、投牢相继而至；若还有上下游借刀，也会在别的卷宗里被点名——你这一指，至少让链条断了一环。`,
    `${killerName}的结局是法度写就的：禁闭、剥夺、偿还。你让恶人把「后来」改成了铁窗与计数日——这算得上一份沉甸甸的成就感。`,
    `真凶落网后，风言风语像退潮：${killerName}再不能借谣言洗白双手。你把结局从「也许永远沉下去」改成了「沉到该沉的地方」。`,
    `${killerName}若曾把「侥幸」当护身符，现在它碎了：卷宗封口处盖着章，章角锋利——足够划开任何下一次侥幸。`,
    `后来传闻：${killerName}在囚室里仍爱整理袖口——可秩序已经不属于 TA。你赢回的是别人的秩序。`
  ]);
  data.epilogue_correct = [c1, c2, c3].join('\n\n');

  const w1 = pick(rng, [
    `手铐「咔嚓」扣在另一只手腕上：$WRONG（$WRONG_ROLE）被带离现场时，背影比任何证词都像一记闷棍——你指错了人。`,
    `逮捕令落下，却落在无辜者名下：$WRONG 愣在原地，像被当众撕掉尊严。那一刻，真凶 $KILLER 大概把呼吸放得很轻。`,
    `讯问室进进出出没几天，笔录边上就把「有罪」的影子烙满了 $WRONG 的名字——墨水干得急，白纸最容易起哄；卷宗第一页要是写岔一行，往后每一页都像跟着歪脖走路。`,
    `闪光灯追着 $WRONG 走，而不是 $KILLER：镜头从不负责真相，只负责把误读放大成全城口味。`,
    `$WRONG 被按进警车时还在回头找人作证——可「被怀疑」本身，已经像墨点洇进白衬衫，怎么洗都留印。`
  ]);
  const w2 = pick(rng, [
    `$WRONG 后来的日子像被砂纸磨过：合作方撤单、邻里窃语、家人请假陪着一次次听证与体检——冤枉是一口慢慢淹过人的井，井沿上还刻着「你曾是侦探」的冷笑话。`,
    `$WRONG 的社会身份在几周内塌成废墟：孩子在学校被问「你妈妈是不是坏人」，老人不敢下楼买菜。愧疚若真有重量，会压得人直不起腰——而这份重量，有一部分该落在指认者心上。`,
    `最锋利的是沉默：$WRONG 不再解释，因为解释也像认罪。名誉像潮退后的沙堡，一次错误的逮捕，足够让潮水永远改道。`,
    `$WRONG 的工位被清空得很快：像从未存在过。可 TA 明明存在过——存在过善意、存在过加班、存在过对未来的打算。`,
    `有人给 $WRONG 递过一句安慰，也有人远远绕开：人群像潮水，冤枉的人站在礁石上，看着船开走。`
  ]);
  const w3 = pick(rng, [
    `真凶 $KILLER（$KILLER_ROLE）没有立刻远遁。风头最紧时 TA 反而安静得像墙皮；等人押岔了、街巷闲话散了，TA 才再度伸手去摸钥匙、印章与尚未清算的旧账。`,
    `$KILLER 借你这一误判，把「自己」从聚光灯下挪开：证物链被搅浑，时间线被重写。后来坊间传闻，有人又在同样的阴影里得手——像在同一条街上复制粘贴。`,
    `$KILLER 在暗处看完了整场戏：无辜者替你坐了被告席，TA 则把尾巴藏进更深的门缝。若无人平反，恶往往会在下一次更熟练地借刀。`,
    `$KILLER 后来把「侥幸」养成了习惯：既然世界会替你认错一次，就会再错第二次——恶在这种纵容里长得更快。`,
    `传闻 $KILLER 在风波后换了圈子、换了说法，却把同一套手法擦得更亮：你放走的不只是一个名字，是一条可复制的路径。`
  ]);
  const w4 = pick(rng, [
    `哪怕哪天平反文书落到桌上，卷宗好歹还给 $WRONG 一行清白——TA 也未必回得去从前：失眠、扯不完的官司、迁怒与自我怀疑，会像霉斑一样长进日常。`,
    `平反若来，也多是迟到：$WRONG 可能换城、换名、换一行职业——不是原谅，只是活下去的策略。`,
    `而你回头翻看附录里记着「动机」的那一行，笔尖仍指着 $KILLER——只是这一页，曾短暂地把主角写岔了人。`,
    `你会记得 $WRONG 的眼神吗？那种「我明明没做」的眼神，会在你下次推理时突然冒出来，像反光。`,
    `$KILLER 若再犯，受害者名单上可能多一行；而 $WRONG 若走不出阴影，名单上也会多一行——只是那一行写的是「活着却碎掉的人」。`
  ]);
  data.epilogue_wrong_template = [w1, w2, w3, w4].join('\n\n');
}

function hashStringToUint(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** 依姓名常见用字推断性别；不详则用 rng（保证同人稳定可由上游 rng 序列决定——此处仅在赋值肖像时 rng） */
function inferGenderFromChineseName(name) {
  const n = String(name).trim();
  if (n.length < 2) return null;
  const given = n.slice(1);
  const last = given[given.length - 1];
  if (/[婷婉娜莉娅姝筠芷若汐玥萱妍婕茹菁茉蓓嫣婵媛婧娆姣娴蕙珂茵璎玑]$/.test(last)) return 'female';
  if (/[伟强磊军涛勇斌峰鹏浩宇轩昊琛铎铠瀚峥峙彪勐]$/.test(last)) return 'male';
  if (/[婷婉娜莉姝筠芷萱妍婕茹菁茉蓓嫣婵媛婧蕙玥汐]$/.test(given)) return 'female';
  if (/[伟强磊军涛勇斌峰鹏浩轩昊琛铎铠瀚峥]$/.test(given)) return 'male';
  return null;
}

/** 按剧本类型切换衣领/肩线隐喻（生成器亦可单独写死每人 gender） */
function costumeFromGenre(genre) {
  const g = String(genre || '');
  if (/仙侠|古风/.test(g)) return 'jianghu';
  if (/民国/.test(g)) return 'minguo';
  if (/科幻/.test(g)) return 'scifi';
  return 'modern';
}

/** 离线 SVG 肖像：体态随性别；发色随年龄；衣冠随剧本气质（genre）微调 */
function buildSuspectPortraitDataUri({ gender, age, seed, costume }) {
  const h = hashStringToUint(seed);
  const hue = h % 360;
  const bg1 = `hsl(${hue}, 24%, 90%)`;
  const bg2 = `hsl(${(hue + 32) % 360}, 18%, 80%)`;
  const skin = gender === 'female' ? '#eccfb8' : '#d9b898';
  const hairBase = age >= 52 ? '#9c948c' : `hsl(${hue}, 44%, 17%)`;
  const outline = '#4a3828';

  let hueShift = 155;
  let sat = 26;
  let light = 36;
  if (costume === 'scifi') {
    hueShift = 205;
    sat = 38;
    light = 34;
  } else if (costume === 'jianghu') {
    hueShift = 118;
    sat = 22;
    light = 30;
  } else if (costume === 'minguo') {
    hueShift = 168;
    sat = 18;
    light = 28;
  }
  const garment = `hsl(${(hue + hueShift) % 360}, ${sat}%, ${light}%)`;

  const hairFemale =
    `<ellipse cx="24" cy="13" rx="15" ry="11" fill="${hairBase}"/><path d="M9 21 Q24 6 39 21 L39 27 Q24 12 9 27 Z" fill="${hairBase}"/>`;
  /* 男性：后发在脸椭圆之下垫体积；前额发际线与鬓角叠在脸皮之上，避免缩略图额头过秃 */
  const hairMaleBack =
    `<ellipse cx="24" cy="12.4" rx="14.8" ry="10.8" fill="${hairBase}"/>` +
    `<path d="M6.5 17 Q24 5 41.5 17 L42 27 Q24 12.5 6 27 Z" fill="${hairBase}"/>` +
    `<path d="M7.5 18 Q6.5 13 12 28 Q10.5 29.5 8 22 Z" fill="${hairBase}"/>` +
    `<path d="M40.5 18 Q41.5 13 36 28 Q37.5 29.5 40 22 Z" fill="${hairBase}"/>`;
  const hairMaleFront =
    `<path d="M12 19.5 Q24 12.8 36 19.5 Q37 21.8 35.5 24 Q24 17 12.5 24 Q11 21.8 12 19.5 Z" fill="${hairBase}" stroke="${outline}" stroke-width="0.28"/>` +
    `<path d="M9.8 22 Q8.8 18.5 12.5 27 Q11.8 27.8 10.2 23.5 Z" fill="${hairBase}"/>` +
    `<path d="M38.2 22 Q39.2 18.5 35.5 27 Q36.2 27.8 37.8 23.5 Z" fill="${hairBase}"/>`;

  let garmentSvg;
  if (costume === 'jianghu') {
    garmentSvg = `<path d="M7 46 Q24 28 41 46 L42 47 H6 Z" fill="${garment}" opacity="0.94"/><path d="M14 37 Q24 31 34 37" fill="none" stroke="${outline}" stroke-width="0.65" opacity="0.45"/>`;
  } else if (costume === 'minguo') {
    garmentSvg = `<path d="M10 44 Q24 34 38 44 L39 47 H9 Z" fill="${garment}" opacity="0.94"/><path d="M17 33 H31 V37 H17 Z" fill="${garment}" stroke="${outline}" stroke-width="0.55" opacity="0.88"/>`;
  } else if (costume === 'scifi') {
    garmentSvg = `<path d="M9 45 L14 35 H34 L39 45 L38 47 H10 Z" fill="${garment}" opacity="0.93"/><path d="M13 39 H35" stroke="rgba(170,210,255,0.55)" stroke-width="0.9"/><path d="M16 42 H32" stroke="rgba(170,210,255,0.35)" stroke-width="0.6"/>`;
  } else {
    garmentSvg = `<path d="M11 43 Q24 33 37 43 L37 47 H11 Z" fill="${garment}" opacity="0.93"/>`;
  }

  const gid = `pb${h % 9973}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <defs><linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>
  <circle cx="24" cy="24" r="23" fill="url(#${gid})" stroke="${outline}" stroke-width="1"/>
  ${gender === 'female' ? hairFemale : hairMaleBack}
  <ellipse cx="24" cy="26" rx="11.5" ry="13.5" fill="${skin}" stroke="${outline}" stroke-width="0.75"/>
  ${gender === 'male' ? hairMaleFront : ''}
  <ellipse cx="18.8" cy="25.2" rx="1.7" ry="2.1" fill="#1a1008"/><ellipse cx="29.2" cy="25.2" rx="1.7" ry="2.1" fill="#1a1008"/>
  <path d="M20.5 31 Q24 34 27.5 31" fill="none" stroke="#9a6848" stroke-width="1.05" stroke-linecap="round"/>
  ${garmentSvg}
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** 生成器可对嫌疑人预设 gender:'male'|'female'；否则按姓名推断并用 rng 补足。衣冠依目录 genre。 */
function assignSuspectPortraits(rng, suspects, genreHint) {
  if (!Array.isArray(suspects)) return;
  const costume = costumeFromGenre(genreHint);
  suspects.forEach(s => {
    let gender = s.gender;
    if (gender !== 'male' && gender !== 'female') {
      gender = inferGenderFromChineseName(s.name);
      if (!gender) gender = rng() < 0.52 ? 'female' : 'male';
      s.gender = gender;
    }
    const age = typeof s.age === 'number' ? s.age : 35;
    const seed = `${s.name}|${s.role}|${age}|${s.relation || ''}|${genreHint}|${costume}`;
    s.avatar_url = buildSuspectPortraitDataUri({ gender: s.gender, age, seed, costume });
  });
}

/** 为关系字段追加随机边缘特征，增加「人」的参差感（不改姓名，避免破坏线索句） */
function sprinkleSuspectTraits(rng, suspects) {
  if (!Array.isArray(suspects)) return;
  const traits = ['惯用左手', '烟瘾重', '乡音难改', '常年失眠', '轻微跛行', '过敏体质', ''];
  suspects.forEach(s => {
    if (!s?.relation) return;
    if (rng() < 0.48) {
      const t = pick(rng, traits);
      if (t) s.relation = `${s.relation} · ${t}`;
    }
    if (typeof s.age === 'number' && rng() < 0.35) {
      s.age = Math.max(18, s.age + (rng() < 0.5 ? -1 : 1) * (rng() < 0.65 ? 1 : 2));
    }
  });
}

/**
 * 结案页展示：根据指控成败返回已生成的结局旁白（占位符已在生成阶段写入模板）。
 */
export function resolveVerdictEpilogue(data, { correct, accusedIndex }) {
  if (!data) return '';
  if (correct) {
    return (
      data.epilogue_correct ||
      '案件告破：真凶归案，无辜者不必再为同一场雨担惊受怕。把这一页合上时，记得你曾把人从「嫌疑人」里领回人间。'
    );
  }
  const w = data.suspects?.[accusedIndex];
  const k = data.suspects?.[data.killer_index];
  if (!w || !k) return '';
  if (!data.epilogue_wrong_template) {
    return [
      `无辜的 ${w.name}（${w.role}）背上了本不属于 TA 的污名：问询、侧目、合作冻结像潮水一样漫上来。`,
      `真凶 ${k.name}（${k.role}）却借这场混乱把影子藏得更深——误判一次，往往等于给恶人让出一扇侧门。`,
      '若能重来，把疑点一寸寸钉回物证与时间线；愧疚若还在，就让它变成下一次更冷的清醒。'
    ].join('\n\n');
  }
  return String(data.epilogue_wrong_template)
    .replace(/\$WRONG_ROLE/g, w.role)
    .replace(/\$KILLER_ROLE/g, k.role)
    .replace(/\$WRONG/g, w.name)
    .replace(/\$KILLER/g, k.name);
}

/** 目录标题、线索/主轴/嫌疑人顺序、气质短句、结案旁白一并落地 */
function applyCatalogAndRemix(data, meta, rng) {
  if (!data) return data;
  const out = { ...data };
  if (meta?.title) out.title = meta.title;
  if (Array.isArray(out.initial_clues) && out.initial_clues.length) {
    out.initial_clues = shuffleInPlace(rng, [...out.initial_clues]);
  }
  if (Array.isArray(out.hidden_clues) && out.hidden_clues.length) {
    out.hidden_clues = shuffleInPlace(rng, [...out.hidden_clues]);
  }
  if (Array.isArray(out.deduction_focus) && out.deduction_focus.length > 2 && rng() < 0.88) {
    out.deduction_focus = shuffleInPlace(rng, [...out.deduction_focus]);
  }
  const mood = pick(rng, [
    '空气湿度黏在袖口',
    '月色褪成冷白',
    '风在转角反复折回',
    '远处灯管频闪却没有人应声',
    '檀香与旧纸混在一起',
    '雷雨云低得像压在咽喉',
    '换气扇低频嗡鸣不肯停',
    '雾气贴地像一层凉灰'
  ]);
  if (out.setting && typeof out.setting === 'string' && rng() < 0.4) {
    out.setting = `${out.setting}（${mood}）`;
  }
  if (Array.isArray(out.suspects) && typeof out.killer_index === 'number') {
    const perm = permuteSuspectsForUi(rng, out.suspects, out.killer_index);
    out.suspects = perm.suspects;
    out.killer_index = perm.killer_index;
    sprinkleSuspectTraits(rng, out.suspects);
    assignSuspectPortraits(rng, out.suspects, meta?.genre || '');
  }
  attachVerdictEpilogues(out, rng);
  return out;
}

export function generateScriptCase(scriptId, rng, difficulty) {
  const diff = difficulty || 'normal';
  const meta = SCRIPT_CATALOG.find(s => s.id === scriptId) || SCRIPT_CATALOG[0];
  const suspectCount = suspectCountFor(meta, diff);
  burnRngStream(rng, scriptId, diff);
  burnRngStream(rng, meta.id || scriptId, suspectCount);

  let data;

  if (scriptId === 'rose_manor') data = generateRoseManor(rng, suspectCount);
  else if (scriptId === 'island_hotel') data = generateIslandHotel(rng, suspectCount);
  else if (scriptId === 'highspeed_train') data = generateHighspeedTrain(rng, suspectCount);
  else if (scriptId === 'old_town') data = generateOldTown(rng, suspectCount);
  else if (scriptId === 'opera_house') data = generateOperaHouse(rng, suspectCount);
  else if (scriptId === 'river_town') data = generateRiverTown(rng, suspectCount);
  else if (scriptId === 'museum_night') data = generateMuseumNight(rng, suspectCount);
  else if (scriptId === 'studio_fire') data = generateStudioFire(rng, suspectCount);
  else if (scriptId === 'phone_booth') data = generatePhoneBooth(rng, suspectCount);
  else if (scriptId === 'ancient_mansion') data = generateAncientMansion(rng, suspectCount);
  else if (scriptId === 'mountain_inn') data = generateMountainInn(rng, suspectCount);
  else if (scriptId === 'midnight_foyer') data = generateDomesticHome(rng, suspectCount, 'foyer');
  else if (scriptId === 'peephole_neighbor') data = generateDomesticHome(rng, suspectCount, 'neighbor');
  else if (scriptId === 'country_villa_weekend') data = generateDomesticHome(rng, suspectCount, 'villa');
  else if (scriptId === 'xianxia_sword_mound') data = generateXianxia(rng, suspectCount, 'sword');
  else if (scriptId === 'xianxia_pill_room') data = generateXianxia(rng, suspectCount, 'pill');
  else if (scriptId === 'sect_library_page') data = generateXianxia(rng, suspectCount, 'library');
  else if (scriptId === 'school_night_class') data = generateCampusNight(rng, suspectCount);
  else if (scriptId === 'office_deadline') data = generateCorporateLift(rng, suspectCount);
  else if (scriptId === 'scifi_pod') data = generateScifiPod(rng, suspectCount);
  else if (scriptId === 'cable_car_sanctuary' || scriptId === 'subway_last_train') data = generateHighspeedTrain(rng, suspectCount);
  else if (scriptId === 'rooftop_greenhouse') data = generateMuseumNight(rng, suspectCount);
  else if (scriptId === 'crypto_exchange_vip') data = rng() < 0.5 ? generateOldTown(rng, suspectCount) : generateStudioFire(rng, suspectCount);
  else if (scriptId === 'temple_incense_murder' || scriptId === 'brush_letter_death' || scriptId === 'jade_workshop_shift') data = generateAncientMansion(rng, suspectCount);
  else if (scriptId === 'floating_market_dawn') data = generateRiverTown(rng, suspectCount);
  else if (scriptId === 'clockwork_ball_murder') data = generateOperaHouse(rng, suspectCount);
  else if (scriptId === 'ink_pavilion_rain') data = generateRoseManor(rng, suspectCount);
  else if (scriptId === 'dormitory_four_twelve' || scriptId === 'canteen_cold_room') data = generateCampusNight(rng, suspectCount);
  else if (scriptId === 'remote_meeting_mute') data = generateCorporateLift(rng, suspectCount);
  else if (scriptId === 'cargo_manifest_ghost') data = generateScifiPod(rng, suspectCount);
  else if (scriptId === 'fog_lighthouse_inn') data = rng() < 0.5 ? generateIslandHotel(rng, suspectCount) : generateMountainInn(rng, suspectCount);
  else if (scriptId === 'star_chart_pavilion') data = generateXianxia(rng, suspectCount, pick(rng, ['sword', 'pill', 'library']));
  else if (scriptId === 'balcony_sparrow') data = generateDomesticHome(rng, suspectCount, 'neighbor');
  else if (meta.genre === '孤岛风暴') data = rng() < 0.55 ? generateIslandHotel(rng, suspectCount) : generateMountainInn(rng, suspectCount);
  else if (meta.genre === '封闭空间') data = generateHighspeedTrain(rng, suspectCount);
  else if (meta.genre === '都市推理') data = pick(rng, [generateOldTown, generateMuseumNight, generateStudioFire, generatePhoneBooth])(rng, suspectCount);
  else if (meta.genre === '古风疑案') data = generateAncientMansion(rng, suspectCount);
  else if (meta.genre === '民国悬疑') data = pick(rng, [generateRiverTown, generateOperaHouse, generateRoseManor])(rng, suspectCount);
  else if (meta.genre === '居家伦理') data = generateDomesticHome(rng, suspectCount, pick(rng, ['foyer', 'neighbor', 'villa']));
  else if (meta.genre === '仙侠诡事') data = generateXianxia(rng, suspectCount, pick(rng, ['sword', 'pill', 'library']));
  else if (meta.genre === '校园推理') data = generateCampusNight(rng, suspectCount);
  else if (meta.genre === '职场推理') data = generateCorporateLift(rng, suspectCount);
  else if (meta.genre === '科幻悬疑') data = generateScifiPod(rng, suspectCount);
  else data = generateRoseManor(rng, suspectCount);

  return applyCatalogAndRemix(data, meta, rng);
}

