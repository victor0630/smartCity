// 引入 moment 时间插件
import moment from "moment";
//获取今日/昨日/本周/上周/本月/上月 时间
export default {
    // 获取今日的开始结束时间
    getToday() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().valueOf()).format("YYYY-MM-DD");
        return obj
    },
    // 获取昨日的开始结束时间
    getYesterday() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().add(-1, 'days').startOf("day").valueOf()).format("MM-DD");
        obj.endtime = moment(moment().add(-1, 'days').endOf('day').valueOf()).format('MM-DD');
        return obj
    },
    //三日
    getThreedays() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().add(-3, 'days').startOf("day").valueOf()).format("MM-DD");
        obj.endtime = moment(moment().valueOf()).format("MM-DD");
        return obj
    },
    //七日
    getSevendays() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().add(-7, 'days').startOf("day").valueOf()).format("MM-DD");
        obj.endtime = moment(moment().valueOf()).format("MM-DD");
        return obj
    },
    // 获取当前周的开始结束时间
    getCurrWeekDays() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().week(moment().week()).startOf('week').add(1, 'days').valueOf()).format('MM-DD')
        obj.endtime = moment(moment().week(moment().week()).endOf('week').add(1, 'days').valueOf()).format('MM-DD');
        return obj
    },
    // 获取上一周的开始结束时间
    getLastWeekDays() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().week(moment().week() - 1).startOf('week').add(1, 'days').valueOf()).format('MM-DD')
        obj.endtime = moment(moment().week(moment().week() - 1).endOf('week').add(1, 'days').valueOf()).format('MM-DD');
        return obj
    },
    // 获取当前月的开始结束时间
    getCurrMonthDays() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().month(moment().month()).startOf('month').valueOf()).format('MM-DD');
        obj.endtime = moment(moment().month(moment().month()).endOf('month').valueOf()).format('MM-DD');
        return obj
    },
    // 获取上一个月的开始结束时间
    getLastMonthDays() {
        let obj = {
            starttime: '',
            endtime: ''
        }
        obj.starttime = moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('MM-DD');
        obj.endtime = moment(moment().month(moment().month() - 1).endOf('month').valueOf()).format('MM-DD');
        return obj
    },
    //获取more页面七天日期
    getThis() {
        let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().valueOf()).format(" DD ");
        return obj;
    },
    getOne() {
         let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().add(-1, 'days').startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().add(-1, 'days').startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().add(-1, 'days').valueOf()).format(" DD ");
        return obj
    },
    getTwo() {
         let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().add(-2, 'days').startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().add(-1, 'days').valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().add(-2, 'days').startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().add(-2, 'days').valueOf()).format(" DD ");
        return obj
    },
    getThree() {
         let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().add(-3, 'days').startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().add(-2, 'days').valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().add(-3, 'days').startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().add(-3, 'days').valueOf()).format(" DD ");
        return obj
    },
    getFour() {
         let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().add(-4, 'days').startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().add(-3, 'days').valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().add(-4, 'days').startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().add(-4, 'days').valueOf()).format(" DD ");
        return obj
    },
    getFive() {
         let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().add(-5, 'days').startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().add(-4, 'days').valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().add(-5, 'days').startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().add(-5, 'days').valueOf()).format("DD");
        return obj
    },
    getSix() {
         let obj = {
            starttime: '',
            endtime: '',
            week: '',
            day:''
        }
        obj.starttime = moment(moment().add(-6, 'days').startOf("day").valueOf()).format("YYYY-MM-DD");
        obj.endtime = moment(moment().add(-5, 'days').valueOf()).format("YYYY-MM-DD");
        obj.week = moment(moment().add(-6, 'days').startOf("day").valueOf()).format("ddd");
        obj.day = moment(moment().add(-6, 'days').valueOf()).format(" DD ");
        return obj
    },
    //获取视频时间
    getVideoTime(){
        let obj = {
            starttime: '',
            endtime: '',
        }
        obj.starttime = moment(moment().add(-6, 'days').startOf("day").valueOf()).format("YYYY-MM-DD HH:mm:ss");
        obj.endtime = moment(moment().valueOf()).format("YYYY-MM-DD HH:mm:ss");
        return obj
    }
 
 
}