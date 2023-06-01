import {mapActions, mapGetters, mapState} from "vuex";
import profileStore from "@/store/profileStore";

export default {
    computed: {
        ...mapGetters({
            orders: "orders/orders",
        }),
    },
    methods: {
        ...mapActions({
            loadOrders: 'orders/loadOrders'
        }),
    }
}