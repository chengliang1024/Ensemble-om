import Mock from 'mockjs';

export default {
    getUserCollectProds: () => ({
        collectProdsForm: [{
            userId: 'admin',
            prodClass: 'RB100',
            prodClassDesc: '个人存款组',
            prodCode: '111001',
            prodDesc: '个人活期存款',
            prodModel: 'RB',
            status: 'A',
            collectData: '20180810',
            action: 'local_activity'
        }, {
            userId: 'admin',
            prodClass: 'RB200',
            prodClassDesc: '对公存款组',
            prodCode: '121001',
            prodDesc: '单位活期存款',
            prodModel: 'RB',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'RB300',
            prodClassDesc: '同业存款组',
            prodCode: '130001',
            prodDesc: '存款类金融机构存放清算款项',
            prodModel: 'RB',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'CL100',
            prodClassDesc: '对私贷款组',
            prodCode: '210001',
            prodDesc: '个人汽车贷款',
            prodModel: 'CL',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'CL200',
            prodClassDesc: '对公贷款组',
            prodCode: '220001',
            prodDesc: '单位流动资金贷款',
            prodModel: 'CL',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'CL300',
            prodClassDesc: '贴现组',
            prodCode: '240001',
            prodDesc: '票据直贴',
            prodModel: 'CL',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'GL100',
            prodClassDesc: '内部账组',
            prodCode: '330001',
            prodDesc: '人行再贷款',
            prodModel: 'GL',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'GL200',
            prodClassDesc: '存放同业组',
            prodCode: '310007',
            prodDesc: '存放境外同业定期款项',
            prodModel: 'GL',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'GL300',
            prodClassDesc: '同业存放组',
            prodCode: '330099',
            prodDesc: '测试用同业存放活期',
            prodModel: 'GL',
            status: 'S',
            action: 'local_activity',
            collectData: '20180810'
        }]
    })
}