import BackTop from "components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "@/components/common/const";
export const backTopMixin ={
    components:{
      BackTop
    },
    data(){
        return{
            isShowBackTop:false
        }
    },
    methods:{
        backTop(){
            // console.log('aa')
            this.$refs.scroll.scrollTo(0, 0, 300);
            this.isShowBackTop = false
        }
    }
}