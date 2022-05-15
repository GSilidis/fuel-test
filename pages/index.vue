<template>
    <div class="index-container">
        <div class="text-center">
            <stations-table @stationSelected="onStationSelected" />
        </div>
    </div>
</template>

<script>
import StationsTable from '@/components/Index/StationsTable';

export default {
    components: {
        StationsTable,
    },
    methods: {
        onStationSelected (uid) {
            this.$router.push({
                path: `/station/${uid}`,
            });
        },
    },
};
</script>
