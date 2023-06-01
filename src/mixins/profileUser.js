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
    }
}