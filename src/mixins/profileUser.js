import {mapActions, mapGetters, mapState} from "vuex";
import profileStore from "@/store/profileStore";

export default {
    computed: {
        ...mapGetters({
            profile: "profile/userProfile",
            isLogin: "profile/isLogin"
        }),
        getRoleUser(){
            return this.profile.role
        }
    },
    methods: {
        ...mapActions({
            loadProfileState: 'profile/loadProfile'
        }),
        isRoleOr(role){
            for (let r of role){
                console.log(r)
                if(this.getRoleUser === r)
                    return true;
            }
            return false;
        }
    }
}