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
        <v-container fluid v-else>
            <BrandFilter v-model="selectedBrandFull" class="mb-3"/>
            <!-- <v-row justify="start" class="align-center">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="flat"
                        label
                        size="large"
                        >
                        <small>Brands</small>
                    </v-chip>
                        <v-btn
                            v-for="letter in alphabet"
                            :key="letter"
                            class="letter-button"
                            :variant="selectedBrand === letter ? 'elevated' : 'outlined'"
                            @click="selectBrand(letter)"
                            color="black"
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                            >
                            {{ letter }}
                        </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedBrand, 'd-none': !selectedBrand }" class="mt-3" justify="start" >
                        <v-btn
                            v-for="coupleLetters in brandsCoupleLetter" 
                            :key="coupleLetters"
                            class="letter-button"
                            :variant="selectedCoupleBrand === coupleLetters ? 'elevated' : 'outlined'"
                            @click="selectCoupleBrand(coupleLetters)"
                            color="black"
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                            {{ coupleLetters }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedCoupleBrand, 'd-none': !selectedCoupleBrand }" class="mt-3">
                        <v-row justify="start" class="align-center">
                            <v-col
                            >
                            <v-chip
                                v-for="(brand, index) in selectedBrandFull"
                                :key="index"
                                class="m-2"
                                closable
                                color="black"
                                style="border-radius: 5px;"
                                variant="flat"
                                @click:close="removeSelectedBrand(index)"
                            >
                                {{ brand }}
                            </v-chip>
                            </v-col>
                        </v-row>
                        <v-row class="letter-button border-brand" color="black" text>
                            <v-col 
                                v-for="brand in brandList" 
                                :key="brand" 
                                cols="12" sm="6" md="4" lg="3">
                                <div href="#" 
                                :class="{ 'selected': selectedBrandFull.includes(brand) }" 
                                class="m-3" 
                                style="font-size: 16px;" 
                                @click="selectBrandName(brand)">
                                    {{ brand }}
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row> -->
            <FamilyFilter :brands="selectedBrandFull" v-model="selectedFamilyFull"/>
            <!-- <v-row justify="start" class="align-center">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="outlined"
                        label
                        size="large"
                    >
                        <small>Family</small> 
                    </v-chip>
                    <p v-if="selectedBrandFull.length === 0">Please, select the Brand of your interest first.</p>
                    <v-btn v-if="familyOptionsLetter.length > 0"
                        v-for="family in familyOptionsLetter"
                        :key="'family_' + family"
                        class="letter-button"
                        :variant="selectedFamily === family ? 'elevated' : 'outlined'"
                        @click="selectFamily(family)"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                        {{ family }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedFamily, 'd-none': !selectedFamily }" class="mt-3">
                        <v-row justify="start" class="align-center">
                            <v-col>
                                <v-chip
                                    v-for="(family, index) in selectedFamilyFull"
                                    :key="index"
                                    class="m-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    @click:close="removeSelectedFamily(index)"
                                >
                                    {{ family }}
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row class="letter-button border-brand" color="black" text>
                            <v-col 
                                v-for="family in familyList" 
                                :key="family" 
                                cols="12" sm="6" md="4" lg="3">
                                <div
                                :class="{ 'selected': selectedFamilyFull.includes(family) }" 
                                class="m-3" 
                                style="font-size: 16px;" 
                                @click="selectFamilyName(family)">
                                    {{ family }}
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row> -->
            <div class="mt-3">
                <v-chip
                    v-for="(model, index) in selectedModelFull"
                    :key="index"
                    class="m-2"
                    closable
                    color="black"
                    style="border-radius: 5px;"
                    variant="flat"
                    @click:close="removeSelectedModel(index)"
                >
                    {{ model }}
                </v-chip>
            </div>
            <v-row justify="start" class="align-center">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="outlined"
                        label
                        size="large"
                    >
                        <small>Model</small>
                    </v-chip>

                    <p v-if="!familySelected">Please, select the Family of your interest first.</p>
                    <v-row v-else class="letter-button border-brand" color="black" text>
                        <v-col 
                            v-for="model in modelList" 
                            :key="model" 
                            cols="12" sm="6" md="4" lg="3">
                            <div href="#" 
                                class="m-3"
                                :class="{ 'selected': selectedModelFull.includes(model) }" 
                                style="font-size: 16px;" 
                                @click="selectModelName(model)">
                                {{ model }}
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <CountriesFilter :continents="continents"/>
            <!-- <v-row justify="start">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="flat"
                        label
                        size="large"
                    >
                        <small>Countries</small>
                    </v-chip>
                    <v-btn
                        v-for="country in countries"
                        :key="country.country_brand_area"
                        class="letter-button"
                        :variant="selectedCountry === country.country_brand_area ? 'elevated' : 'outlined'"
                        @click="selectCountry(country.country_brand_area)"
                        color="black"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ country.country_brand_area }}
                    </v-btn>
                </v-col>
            </v-row> -->
            <!-- <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedCountry, 'd-none': !selectedCountry }" class="mt-3">
                        <v-row justify="start" class="align-center">
                            <v-col>
                                <v-chip
                                    v-for="(countryName, index) in selectedCountryChip"
                                    :key="index"
                                    class="m-2"
                                    closable
                                    color="black"
                                    style="border-radius: 5px;"
                                    variant="flat"
                                    @click:close="removeSelectedCountry(index)"
                                >
                                    {{ countryName }}
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row class="letter-button border-brand" color="black" text>
                            <v-col 
                                v-for="flag in countries2" 
                                :key="flag" 
                                cols="12" sm="2" md="2" lg="2"
                                class="flex-center object-cover"
                                >
                                    <div 
                                    :class="selectedCountryChip.includes(flag.country_brand_name) == true ? 'border-blue-400' : 'border-transparent'" 
                                    class="m-3 w-14 h-9 border-2" 
                                    style="font-size: 16px;" 
                                    @click="selectFlag(flag)">
                                        <v-img :src="getImageUrl(flag.country_brand_name)" cover class="w-full h-full"/>
                                    </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row> -->
            <v-row justify="start">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="flat"
                        label
                        size="large"
                    >
                        <small>Types</small>
                    </v-chip>
                    <v-btn
                        v-for="type in types"
                        :key="type.body_type"
                        class="letter-button"
                        :variant="selectedType === type.body_type ? 'elevated' : 'outlined'"
                        @click="selectType(type.body_type)"
                        :color="selectedType === type.body_type ? 'black' : ''"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ type.body_type }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedType, 'd-none': !selectedType }" class="mt-3" justify="start" >
                        <v-btn
                            v-for="catType in categoryType" 
                            :key="catType.body_category"
                            class="letter-button"
                            :variant="selectedCategoryType === catType.body_category ? 'elevated' : 'outlined'"
                            @click="selectedType != null ? selectCategoryType(selectedType, catType.body_category) : ''"
                            color="black"
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                            {{ catType.body_category }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedCategoryType, 'd-none': !selectedCategoryType }" class="mt-3">
                        <v-row justify="start" class="align-center">
                            <v-col
                            >
                            <v-chip
                                v-for="(categoryName, index) in selectedCategoryName"
                                :key="index"
                                class="m-2"
                                closable
                                color="black"
                                style="border-radius: 5px;"
                                variant="flat"
                                @click:close="removeSelectedCategoryName(index)"
                            >
                                {{ categoryName }}
                            </v-chip>
                            </v-col>
                        </v-row>
                        <v-row class="letter-button border-brand" color="black" text>
                            <v-col 
                                v-for="categoryName in listaType" 
                                :key="categoryName.body_shape" 
                                cols="12" sm="6" md="4" lg="3">
                                <div 
                                    class="m-3"
                                    :class="{ 'selected': selectedCategoryName.includes(categoryName.body_shape) }" 
                                    style="font-size: 16px;" 
                                    @click="selectCategoryName(categoryName.body_shape)">
                                    {{ categoryName.body_shape }}
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="start">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="outlined"
                        label
                        size="large"
                    >
                        <small>Attributes</small>
                    </v-chip>
                    <v-btn
                        v-for="attribute in attributes"
                        :key="attribute.body_shape"
                        class="letter-button"
                        :variant="selectedAttributes.includes(attribute.body_shape) === true ? 'elevated' : 'outlined'"
                        @click="toggleAttribute(attribute.body_shape)"
                        :color="selectedAttributes.includes(attribute.body_shape) === true ? 'black' : ''"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ attribute.body_shape }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="outlined"
                        label
                        size="large"
                    >
                        <small>Periods</small>
                    </v-chip>
                    <v-btn
                        v-for="period in periods"
                        :key="period.age_name"
                        class="letter-button"
                        :variant="selectedPeriods.includes(period.age_name) ? 'elevated' : 'outlined'"
                        @click="selectPeriod(period.age_name)"
                        :color="selectedPeriods.includes(period.age_name) ? 'black' : ''"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ period.age_name }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start">
                <v-col class="d-flex flex-wrap align-center">
                    <v-chip
                        class="custom-chip mr-3"
                        color="#0D6EFD"
                        variant="flat"
                        label
                        size="large"
                    >
                        <small>Colours</small>
                    </v-chip>
                    <v-btn
                        v-for="colour in colours"
                        :key="colour.colorfamily_name"
                        class="letter-button"
                        :variant="selectedColour.includes(colour.colorfamily_name) ? 'elevated' : 'outlined'"
                        @click="selectColour(colour.colorfamily_name)"
                        :color="selectedColour.includes(colour.colorfamily_name) ? 'black' : ''"
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ colour.colorfamily_name }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
                <v-col class="d-flex flex-wrap align-center pt-0">
                    <div :class="{ 'd-block': selectedBrand, 'd-none': !selectedBrand }" class="mt-3" justify="start" >
                        <v-btn
                            v-for="color in sfumature" 
                            :key="color.color_name"
                            class="letter-button"
                            :variant="selectedColor.includes(color.color_name) ? 'elevated' : 'outlined'"
                            @click="selectColorSfumatura(color.color_name)"
                            color="black"
                            text=""
                            style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                            {{ color.color_name }}
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
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
import { toggleValueInArray } from '@/utils/functions/toggleValueInArray';
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
    components: { BrandFilter, CountriesFilter, FamilyFilter },
    data() {
        return {
            alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            brandSelected: false,
            brandCoupleSelected: false,
            familySelected: false,
            modelSelected: false,
            selectedBrand: null  as null | string,
            selectedBrandFull: [] as string[],
            selectedCoupleBrand: null,
            selectedFamily: null as null | string,
            selectedModel: null,
            selectedCountry: null as null | string,
            countrySelected: false,
            selectedType: null as null | string,
            selectedCategoryType: null as null | string,
            typeSelected: false,
            categoryTypeSelected: false, 
            attributes: [] as any[],
            selectedAttributes: [] as string[],
            types: [] as any[],
            categoryType: [] as any[],
            continents: [] as any[],
            countries2: [] as any[],
            periods: [] as any[],
            selectedPeriods: [] as string[],
            // periodSelected: false,
            colours: [] as any[],
            sfumature: [] as any[],
            selectedColour: [] as string[],
            selectedColor: [] as string[] ,
            // colourSelected: false,
            // colorSelected: false,
            miscOptionsSold: ['Sold', 'Not sold'] as MiscSoldType[],
            miscOptionsQuote: ['Quoted', 'Not quoted'] as MiscQuoteType[],
            miscOptionChas: ['With chassis', 'Without chassis'] as MiscChasType[],
            selectedMiscellaneous: {
                miscOptionsSold: null,
                miscOptionsQuote: null,
                miscOptionChas: null
            } as MiscSelections,
            miscellaneousSelected: false,
            selectedFilters: [] as string[],
            brandsCoupleLetter: [] as any[],
            brandList: [] as any[],
            familyOptionsLetter: [] as any[],
            selectedFamilyFull: [] as string[],
            familyList: [] as any[],
            selectedModelFull: [] as string[],
            selectedCategoryName: [] as any[],
            modelList: [] as any[],
            listaType: [] as any[],
            loading: true,
            selectedCountryChip: [] as any[],
            selectedFlag: null,
        };
    },
    mounted() {
        Promise.all([
        this.fetchContinents(),
        this.fetchAttributes(),
        this.fetchPeriods(),
        this.fetchColoursPrimary(),
        this.fetchType(),
        ]).then(() => {
        this.loading = false;
        }).catch((error) => {
        console.error('Errore durante il recupero dei dati:', error);
           this.loading = false;
        });
    },

    methods: {
        async selectBrand(letter: string) {
            try {
                this.selectedBrand = letter;
                this.brandSelected = true;
                this.familySelected = false;
                this.modelSelected = false;
                this.countrySelected = false;

                const response = await axios.get(`/filter/bidwatcher_brand/name_left_2/?search=name_left_1:${letter}`);
                const brandsCoupleLetter = response.data.items.map((item: any) => item.left_1);
                this.brandsCoupleLetter = brandsCoupleLetter;
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },

        async selectCoupleBrand(brandsCoupleLetter: any) {
            try {
                this.selectedCoupleBrand = brandsCoupleLetter;
                this.brandCoupleSelected = true;

                const response = await axios.get(`/filter/bidwatcher_brand/name/?search=name_left_2:${brandsCoupleLetter}`);
                const brands = response.data.items.map((item: any) => item.name);
                this.brandList = brands;
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },

        async selectBrandName(brand: any) {
            try {
                // Aggiungi o rimuovi il marchio selezionato dalla lista
                if (!this.selectedBrandFull.includes(brand)) {
                    this.selectedBrandFull.push(brand);
                } else {
                    this.selectedBrandFull = this.selectedBrandFull.filter(selectedBrand => selectedBrand !== brand);
                }

                const brandNames = this.selectedBrandFull.join('|');

                const response = await axios.get('/filter/filter_charts_vehicles/family_name_left_1/', {
                    params: {
                        search: `brand_name:${brandNames}`,
                    }
                });

                const familyOptions = response.data.items;

                let letters: string[] = [];
                let numbers: string[] = [];

                familyOptions.forEach((item: any) => {
                    const value = item.left_1;
                    if (isNaN(value)) {
                        letters.push(value); 
                    } else {
                        numbers.push(value); 
                    }
                });

                letters.sort();
                numbers.sort((a, b) => parseInt(a) - parseInt(b));

                this.familyOptionsLetter = letters.concat(numbers);
            } catch (error) {
                console.error('Errore nella richiesta GET:', error);
            }
        },

        removeSelectedBrand(index: number) {
            this.selectedBrandFull.splice(index, 1);
        },

        async selectFamily(letter: string) {
            try {
                this.selectedFamily = letter;
                this.modelSelected = false;
                this.countrySelected = false; 

                const response = await axios.get('/filter/filter_charts_vehicles/family_name/', {
                    params: {
                        search: `brand_name:${this.selectedBrandFull.join('|')}`,
                        family_name: letter
                    }
                });

                const filteredFamilies = response.data.items.filter((item: any) => item.family_name.startsWith(letter));

                const familyNames = filteredFamilies.map((item: any) => item.family_name);

                this.familyList = familyNames;
            } catch (error) {
                console.error('Errore nella richiesta GET:', error);
            }
        },

        async selectFamilyName(family: string) {
            if (!this.selectedFamilyFull.includes(family)) {
                this.selectedFamilyFull.push(family);
            }

            try {
                this.familySelected = true;

                const response = await axios.get('/filter/filter_charts_vehicles/model_name/', {
                    params: {
                        search: `family_name:${family}`
                    }
                });

                this.modelList = response.data.items.map((item: any) => item.model_name);
                
                this.selectedModel = null;
                
                this.familySelected = true;
            } catch (error) {
                console.error('Errore nella richiesta GET:', error);
            }
        },

        removeSelectedFamily(index: number) {
            this.selectedFamilyFull.splice(index, 1);
        },

        async selectModelName(model: string) {
            if (!this.selectedModelFull.includes(model)) {
                this.selectedModelFull.push(model);
            }

            this.modelSelected = true;

            this.familySelected = true;
        },

        removeSelectedModel(index: number) {
            this.selectedModelFull.splice(index, 1);
        },

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
                this.types = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },

        async selectType(type: string) {
            this.selectedType = type;
            this.typeSelected = true;

            try {
                const response = await axios.get('/filter/filter_charts_vehicles/body_category/', {
                    params: {
                        search: `body_type:${type}`
                    }
                });
                this.categoryType = response.data.items; 
                
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },

        async selectCategoryType(type: string, categoryType: string) {
             this.selectedType = type;
             this.typeSelected = true;

             this.selectedCategoryType = categoryType;
             this.categoryTypeSelected = true;

            try {
               const response = await axios.get('/filter/filter_charts_vehicles/body_shape/', {
                     params: {
                         search: `body_type:${type},body_category:${categoryType}`
                    }
                });
                this.listaType = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
             }
        },

        async selectCategoryName(categoryName: string) {
            if (!this.selectedCategoryName.includes(categoryName)) {
                this.selectedCategoryName.push(categoryName);
            }

        },

        removeSelectedCategoryName(index: number) {
            this.selectedCategoryName.splice(index, 1);
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

        toggleAttribute(attribute: string) {
            toggleValueInArray(this.selectedAttributes, attribute)
        },

        async fetchPeriods() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/age_name/');
                this.periods = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },

        async fetchColoursPrimary() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/colorfamily_name/');
                this.colours = response.data.items; 
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },

        async selectColour(colour: string) {
            toggleValueInArray(this.selectedColour, colour)
            
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/color_name/', {
                    params: {
                        search: `colorfamily_name:${this.selectedColour.join("|")}`
                    }
                });
                this.sfumature = response.data.items;
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },

        selectColorSfumatura(color: string){
            toggleValueInArray(this.selectedColor, color)
        },

        async selectCountry(country: string) {
            this.selectedCountry = country;
            this.countrySelected = true;

            try {
                const response = await axios.get('/filter/filter_charts_vehicles/country_brand_name/', {
                    params: {
                        search: `country_brand_area:${country}`
                    }
                });
                this.countries2 = response.data.items;
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }

        },

        getImageUrl(countryFlag: string) {
        const brandAbbreviation = countryFlag.substring(0, 3).toUpperCase();
            return `https://past-auction-p.s3.amazonaws.com/LogoCountry/${brandAbbreviation}.jpeg`;
        },

        async selectFlag(flag: any) {
            try {
                // Verifica se la bandiera è già stata selezionata
                const index = this.selectedCountryChip.indexOf(flag.country_brand_name);
                
                // Se la bandiera è già stata selezionata, rimuovila dall'array
                if (index !== -1) {
                    this.selectedCountryChip.splice(index, 1);
                } else {
                    // Altrimenti, aggiungila all'array
                    this.selectedCountryChip.push(flag.country_brand_name);
                }

                // Imposta il resto del codice come prima
                this.selectedFlag = flag;
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },

        removeSelectedCountry(index: number) {
            this.selectedCountryChip.splice(index, 1);
        },

        selectPeriod(period: string) {
            toggleValueInArray(this.selectedPeriods, period)
        },
        
        selectMiscellaneous<T extends keyof MiscSelections>(item: MiscSelections[T], arrayName: T) {
            if (this.selectedMiscellaneous[arrayName] !== item) {
                this.selectedMiscellaneous[arrayName] = item;
            } else {
                this.selectedMiscellaneous[arrayName] = null;
            }
        },

        clearFilters() {
            this.selectedBrand= null;
            this.selectedBrandFull= [];
            this.selectedCoupleBrand= null;
            this.selectedFamily= null;
            this.selectedModel= null;
            this.selectedCountry= null;
            this.selectedType= null;
            this.selectedCategoryType= null;
            this.selectedAttributes= [];
            this.selectedPeriods= [];
            this.selectedColour= [];
            this.selectedColor= [];
            this.selectedMiscellaneous.miscOptionsSold = null;
            this.selectedFilters= [];
            this.selectedFamilyFull= [];
            this.selectedModelFull= [];
            this.selectedCategoryName= [];
        },

        async previewDataset() {
            const selectedBrandArray = Array.from(this.selectedBrandFull);
            let brand_name = "";
            if (selectedBrandArray.length > 1) {
                brand_name = `brand_name:${selectedBrandArray.join("|")},`;
            } else if (selectedBrandArray.length === 1) {
                brand_name = `brand_name:${selectedBrandArray[0]},`;
            } else {
                brand_name = ``;
            }

            const selectedFamilyArray = Array.from(this.selectedFamilyFull);
            let bw_family_name = "";
            if (selectedFamilyArray.length > 1) {
                bw_family_name = `bw_family_name:${selectedFamilyArray.join("|")},`;
            } else if (selectedFamilyArray.length === 1) {
                bw_family_name = `bw_family_name:${selectedFamilyArray[0]},`;
            } else {
                bw_family_name = ``;
            }

            const selectedModelArray = Array.from(this.selectedModelFull);
            let bw_model_name = "";
            if (selectedModelArray.length > 1) {
                bw_model_name = `bw_model_name:${selectedModelArray.join("|")},`;
            } else if (selectedModelArray.length === 1) {
                bw_model_name = `bw_model_name:${selectedModelArray[0]},`;
            } else {
                bw_model_name = ``;
            }

            let country_brand_name = "";
            country_brand_name = `country_brand_name:${this.selectedCountry},`;

            const selectedAreaBrandArray = Array.from(this.selectedCountryChip);
            let area_brand = "";
            if (selectedAreaBrandArray.length > 1) {
                area_brand = `area_brand:${selectedAreaBrandArray.join("|")},`;
            } else if (selectedAreaBrandArray.length === 1) {
                area_brand = `area_brand:${selectedAreaBrandArray[0]},`;
            } else {
                area_brand = ``;
            }

            const selectedCategoryNameArray = Array.from(this.selectedCategoryName);
            let body_type = "";
            if (selectedCategoryNameArray.length > 1) {
                body_type = `body_type:${selectedCategoryNameArray.join("|")},`;
            } else if (selectedCategoryNameArray.length === 1) {
                body_type = `body_type:${selectedCategoryNameArray[0]},`;
            } else {
                body_type = ``;
            }

            let shape = this.selectedAttributes.length > 0 ? `shape:${this.selectedAttributes.join("|")},` : "";

            // `age_name:${this.selectedPeriods},`
            let age_name = "";
            age_name = this.selectedPeriods.length > 0 ? `age_name:${this.selectedPeriods.join("|")},` : "" ;


            let family_color_main_name = "";
            family_color_main_name = `family_color_main_name:${this.selectedColour.join("|")},`;

            let color_main_name = "";
            color_main_name = `color_main_name:${this.selectedColor},`;

            console.log(`${brand_name}${bw_family_name}${bw_model_name}${country_brand_name}${area_brand}${body_type}${shape}${age_name}${family_color_main_name}${color_main_name}`);
            console.log(
                this.selectedBrandFull,
                this.selectedFamilyFull,
                this.selectedModelFull,
                this.selectedCountry,
                this.selectedCountryChip,
                this.selectedCategoryName,
                this.selectedAttributes,
                this.selectedPeriods,
                this.selectedColour,
                this.selectedColor,
                this.selectedMiscellaneous.miscOptionsSold,
                this.selectedMiscellaneous.miscOptionsQuote,
                this.selectedMiscellaneous.miscOptionChas)
                try {
                    const response = await axios.get('/bidwatcher_vehicle/query_v/', {
                        params: {
                            search: `${brand_name}${bw_family_name}${bw_model_name}${country_brand_name}${area_brand}${body_type}${shape}${age_name}${family_color_main_name}${color_main_name}`
                        }
                    });
                    this.countries2 = response.data.items;
                } catch (error) {
                    console.error('Errore nel recupero dei paesi:', error);
                }
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
            return this.selectedColor.length > 0
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