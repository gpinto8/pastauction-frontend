<template>
    <div class="m-5">
        <v-container fluid>
            <v-alert 
                color="info"
                variant="tonal"
            >
                <v-row justify="center">
                    <v-col cols="12">
                    <div class="text-center text-black">
                        <h3><strong>Brand Filter</strong></h3>
                    </div>
                    </v-col>
                </v-row>
            </v-alert>
            <v-row justify="start" class="mt-2">
                <v-col>
                    <small>Please, select almost 3 parameters</small>
                </v-col>
                <v-col>
                    <v-btn size="x-small" class="float-right" color="black" @click="clearFilters">Clear filters</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid v-if="loading">
            <div class="m-5 d-flex align-center justify-center">
                <v-progress-circular
                    v-if="loading"
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate
                ></v-progress-circular>
            </div>
        </v-container>
        <v-container fluid v-else class="space-y-3">
            <BrandFilter v-model="selectedBrands"/>
            <FamilyFilter :brands="selectedBrands" v-model="selectedFamilies"/>
            <ModelFilter :families="selectedFamilies" v-model="selectedModelFull"/>
            <CountriesFilter :continents="continents" v-model:countries="selectedCountries"/>
            <TypesFilter 
                v-model="types" 
                v-model:selectedFamily="selectedFamilyType" 
                v-model:selectedCategory="selectedCatergoryType"
                :familiesOfTypes="typesFamilies"
            />
            <AttributesFilter v-model="selectedAttributes" :attributes="attributes" />
            <PeriodsFilter v-model="selectedPeriods" :periods="periods"/>
            <ColorsFilter v-model="selectedColors" :colorFamilies="colorsFamilies"/>
            <v-row justify="start">
                <v-col>
                    <div class="d-flex flex-wrap align-center">
                        <v-chip
                            class="custom-chip mr-3"
                            color="#0D6EFD"
                            variant="outlined"
                            size="large"
                            label
                        >
                            <small>Miscellaneous</small>
                        </v-chip>
                        <div>
                            <div class="d-flex justify-space-between">
                                <div class="me-4">
                                    <v-btn
                                        v-for="item in miscOptionsSold"
                                        :key="item"
                                        class="letter-button"
                                        :variant="selectedMiscellaneous.miscOptionsSold === item ? 'elevated' : 'outlined'"
                                        @click="selectMiscellaneous(item, 'miscOptionsSold')"
                                        :color="selectedMiscellaneous.miscOptionsSold === item ? 'black' : ''"
                                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                                    >
                                        {{ item }}
                                    </v-btn>
                                </div>
                                <div class="me-4">
                                    <v-btn
                                        v-for="item in miscOptionsQuote"
                                        :key="item"
                                        class="letter-button"
                                        :variant="selectedMiscellaneous.miscOptionsQuote === item ? 'elevated' : 'outlined'"
                                        @click="selectMiscellaneous(item, 'miscOptionsQuote')"
                                        :color="selectedMiscellaneous.miscOptionsQuote === item ? 'black' : ''"
                                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                                    >
                                        {{ item }}
                                    </v-btn>
                                </div>
                                <div class="me-4">
                                    <v-btn
                                        v-for="item in miscOptionChas"
                                        :key="item"
                                        class="letter-button"
                                        :variant="selectedMiscellaneous.miscOptionChas === item ? 'elevated' : 'outlined'"
                                        @click="selectMiscellaneous(item, 'miscOptionChas')"
                                        :color="selectedMiscellaneous.miscOptionChas === item ? 'black' : ''"
                                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                                    >
                                        {{ item }}
                                    </v-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <div class="d-flex justify-end">
                        <v-btn size="small" class="mr-2" variant="outlined" color="black" @click="$router.push({ name: 'Charts' });">Back</v-btn>
                        <v-btn size="small" class="float-right" color="black" @click="previewDataset()">Preview data set</v-btn>
                    </div>
                </v-col>
            </v-row>
    </v-container>
    </div>
</template>

<script lang="ts">
import BrandFilter from './filters/BrandFilter.vue';
import FamilyFilter from './filters/Family.vue';
import ModelFilter from './filters/Model.vue';
import TypesFilter from './filters/Types.vue';
import AttributesFilter from './filters/Attributes.vue';
import PeriodsFilter from './filters/Periods.vue';
import ColorsFilter from './Colors.vue';
import axios from 'axios';
import CountriesFilter from './filters/Countries.vue';

type MiscSoldType = "Sold" | "Not sold"
type MiscQuoteType = "Quoted" | "Not Quoted"
type MiscChasType = "With chassis" | "Without chassis"

type MiscSelections = {
    "miscOptionsSold": null | MiscSoldType,
    "miscOptionsQuote":null | MiscQuoteType,
    "miscOptionChas":null | MiscChasType
}

export default {
    components: { 
        BrandFilter, 
        CountriesFilter, 
        FamilyFilter, 
        ModelFilter, 
        TypesFilter, 
        AttributesFilter, 
        PeriodsFilter, 
        ColorsFilter
    },
    data() {
        return {
            selectedBrands: [] as string[],
            selectedContinent: null as null | string,
            attributes: [] as any[],
            selectedAttributes: [] as string[],
            types: [] as any[],
            typesFamilies: [] as any[],
            selectedFamilyType: null as null | string,
            selectedCatergoryType: null as null | string,
            continents: [] as any[],
            periods: [] as any[],
            selectedPeriods: [] as string[],
            colorsFamilies: [] as any[],
            selectedColour: [] as string[],
            selectedColors: [] as string[] ,
            miscOptionsSold: ['Sold', 'Not sold'] as MiscSoldType[],
            miscOptionsQuote: ['Quoted', 'Not quoted'] as MiscQuoteType[],
            miscOptionChas: ['With chassis', 'Without chassis'] as MiscChasType[],
            selectedMiscellaneous: {
                miscOptionsSold: null,
                miscOptionsQuote: null,
                miscOptionChas: null
            } as MiscSelections,
            miscellaneousSelected: false,
            selectedFamilies: [] as string[],
            selectedModelFull: [] as string[],
            selectedCategoryName: [] as any[],
            loading: false,
            selectedCountries: [] as any[],
        };
    },
    mounted() {
        Promise.all([
        this.fetchContinents(),
        this.fetchAttributes(),
        this.fetchPeriods(),
        this.fetchColorsFamilies(),
        this.fetchType(),
        ]).then(() => {
        this.loading = false;
        }).catch((error) => {
        console.error('Errore durante il recupero dei dati:', error);
           this.loading = false;
        });
    },

    methods: {
        async fetchContinents() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/country_brand_area/');
                this.continents = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },
        async fetchType() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/body_type/');
                this.typesFamilies = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },
        async fetchAttributes() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/body_shape/', {
                    params: {
                        search: `body_category:Attribute`
                    }
                });
                this.attributes = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },
        async fetchPeriods() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/age_name/');
                this.periods = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },
        async fetchColorsFamilies() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/colorfamily_name/');
                this.colorsFamilies = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },
        selectMiscellaneous<T extends keyof MiscSelections>(item: MiscSelections[T], arrayName: T) {
            if (this.selectedMiscellaneous[arrayName] !== item) {
                this.selectedMiscellaneous[arrayName] = item;
            } else {
                this.selectedMiscellaneous[arrayName] = null;
            }
        },
        clearFilters() {
            // Don't do this.selectedBrandFull = [] or it will break vue's reactivnes
            this.emptyArray(this.selectedBrands)
            this.selectedContinent= null;
            this.emptyArray(this.selectedAttributes)
            this.emptyArray(this.selectedPeriods)
            this.emptyArray(this.selectedColour)
            this.emptyArray(this.selectedColors)
            this.selectedMiscellaneous.miscOptionsSold = null;
            this.emptyArray(this.selectedFamilies)
            this.emptyArray(this.selectedModelFull)
            this.emptyArray(this.selectedCategoryName)

            // Reset types filters
            this.emptyArray(this.types)
            this.selectedFamilyType = null
            this.selectedCatergoryType = null

        },
        emptyArray(arr: any[]) {
            arr.splice(0, arr.length)
        },
        async previewDataset() {
            
            let searchParams = [
                this.getBrandsSearchParams(),
                this.getPeriodsSearchParams(),
            ]

            console.log(searchParams.join(','));
            // console.log(
            //     this.selectedBrands,
            //     this.selectedFamilies,
            //     this.selectedModelFull,
            //     this.selectedContinent,
            //     this.selectedCountries,
            //     this.selectedCategoryName,
            //     this.selectedAttributes,
            //     this.selectedPeriods,
            //     this.selectedColour,
            //     this.selectedColors,
            //     this.selectedMiscellaneous.miscOptionsSold,
            //     this.selectedMiscellaneous.miscOptionsQuote,
            //     this.selectedMiscellaneous.miscOptionChas)
                try {
                    const response = await axios.get(`/bidwatcher_vehicle/query_v?search=${searchParams.join(',')}`);
                    // const response = await axios.get(`/bidwatcher_vehicle/query_v?search=brand_name%3AAbarth%2Cage_name%3AModern&page=1&size=50`);
                    console.log(response);
                } catch (error) {
                    console.error('Preview dataset error:', error);
                }
        },
        getBrandsSearchParams() {
            return `brand_name:${this.selectedBrands.join('|')}`
        },
        getPeriodsSearchParams() {
            return `age_name:${this.selectedPeriods.join('|')}`
        }
    },
    computed: {
        attributeSelected() {
            return this.selectedAttributes.length > 0
        },
        periodSelected() {
            return this.selectedPeriods.length > 0
        },
        colourSelected() {
            return this.selectedColour.length > 0
        },
        colorSelected() {
            return this.selectedColors.length > 0
        }
    }
};
</script>


<style>
.custom-chip {
  width: 100px;
  display: flex;
  justify-content: center; 
  align-items: center; 
}

.selected{
    text-decoration: underline;
    color: #407BFF;
}

.border-brand{
    min-width: 20px; 
    margin: 2px; 
    border: 1px solid black; 
    font-size: 10px;
}
.category-link {
    display: block;
    position: relative;
    padding-left: 10px; /* Spazio a sinistra della linea */
}
</style>