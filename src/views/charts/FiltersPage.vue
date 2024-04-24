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
            <v-row justify="start" class="align-center">
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
                            text
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
                            text
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
                                <a href="#" 
                                :class="{ 'selected': selectedBrandFull.includes(brand) }" 
                                class="m-3" 
                                style="font-size: 16px;" 
                                @click="selectBrandName(brand)">
                                    {{ brand }}
                                </a>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center">
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
                        text
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
                                <a href="#" 
                                :class="{ 'selected': selectedFamilyFull.includes(family) }" 
                                class="m-3" 
                                style="font-size: 16px;" 
                                @click="selectFamilyName(family)">
                                    {{ family }}
                                </a>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
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
                            <a href="#" 
                                class="m-3"
                                :class="{ 'selected': selectedModelFull.includes(model) }" 
                                style="font-size: 16px;" 
                                @click="selectModelName(model)">
                                {{ model }}
                            </a>
                        </v-col>
                    </v-row>
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
                        <small>Countries</small>
                    </v-chip>
                    <v-btn
                        v-for="country in countries"
                        :key="country.country_brand_area"
                        class="letter-button"
                        :variant="selectedCountry === country.country_brand_area ? 'elevated' : 'outlined'"
                        @click="selectCountry(country.country_brand_area)"
                        color="black"
                        text
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ country.country_brand_area }}
                    </v-btn>
                </v-col>
            </v-row>
            <v-row justify="start" class="align-center mt-0">
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
                                class="d-flex justify-center"
                                >
                                    <a href="#" 
                                    :class="{ 'selected': selectedBrandFull.includes(brand) }" 
                                    class="m-3" 
                                    style="font-size: 16px;" 
                                    @click="selectFlag(flag)">
                                    <v-img :src="getImageUrl(flag.country_brand_name)" width="120px"/>
                                    </a>
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
                        text
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
                            @click="selectCategoryType(selectedType, catType.body_category)"
                            color="black"
                            text
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
                                <a href="#" 
                                    class="m-3"
                                    :class="{ 'selected': selectedCategoryName.includes(categoryName.body_shape) }" 
                                    style="font-size: 16px;" 
                                    @click="selectCategoryName(categoryName.body_shape)">
                                    {{ categoryName.body_shape }}
                                </a>
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
                        :variant="selectedAttribute === attribute.body_shape ? 'elevated' : 'outlined'"
                        @click="selectAttribute(attribute.body_shape)"
                        :color="selectedAttribute === attribute.body_shape ? 'black' : ''"
                        text
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
                        :variant="selectedPeriod === period.age_name ? 'elevated' : 'outlined'"
                        @click="selectPeriod(period.age_name)"
                        :color="selectedPeriod === period.age_name ? 'black' : ''"
                        text
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
                        :variant="selectedColour === colour.colorfamily_name ? 'elevated' : 'outlined'"
                        @click="selectColour(colour.colorfamily_name)"
                        :color="selectedColour === colour.colorfamily_name ? 'black' : ''"
                        text
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
                            :variant="selectedColor === color.color_name ? 'elevated' : 'outlined'"
                            @click="selectColorSfumatura(color.color_name)"
                            color="black"
                            text
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
                                        text
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
                                        text
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
                                        text
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
                        <v-btn size="small" class="mr-2" variant="outlined" color="black" @click="this.$router.push({ name: 'Charts' });">Back</v-btn>
                        <v-btn size="small" class="float-right" color="black" @click="previewDataset()">Preview data set</v-btn>
                    </div>
                </v-col>
            </v-row>
    </v-container>
    </div>
</template>

<script>
import router from '@/router/index';
import axios from 'axios';

export default {
    data() {
        return {
            brandSelected: false,
            brandCoupleSelected: false,
            familySelected: false,
            modelSelected: false,
            selectedBrand: [],
            selectedBrandFull: [],
            selectedCoupleBrand: null,
            selectedFamily: null,
            selectedModel: null,
            selectedCountry: null,
            countrySelected: false,
            selectedType: null,
            selectedCategoryType: null,
            typeSelected: false,
            categoryTypeSelected: false, 
            attributes: [],
            selectedAttribute: null,
            attributeSelected: false,
            types: [],
            categoryType: [],
            alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            countries: [],
            countries2: [],
            periods: [],
            selectedPeriod: null,
            periodSelected: false,
            colours: [],
            sfumature: [],
            selectedColour: null,
            selectedColor: null,
            colourSelected: false,
            colorSelected: false,
            miscOptionsSold: ['Sold', 'Not sold'],
            miscOptionsQuote: ['Quoted', 'Not quoted'],
            miscOptionChas: ['With chassis', 'Without chassis'],
            selectedMiscellaneous: {
                miscOptionsSold: null,
                miscOptionsQuote: null,
                miscOptionChas: null
            },
            miscellaneousSelected: false,
            selectedFilters: [],
            brandsCoupleLetter: [],
            brandList: [],
            familyOptionsLetter: [],
            selectedFamilyFull: [],
            familyList: [],
            selectedModelFull: [],
            selectedCategoryName: [],
            modelList: [],
            listaType: [],
            loading: true,
            selectedCountryChip: [],
            selectedFlag: null,
        };
    },

    mounted() {
        Promise.all([
        this.fetchCountries(),
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
        async selectBrand(letter) {
            try {
                this.selectedBrand = letter;
                this.brandSelected = true;
                this.familySelected = false;
                this.modelSelected = false;
                this.countrySelected = false;

                const response = await axios.get(`/filter/bidwatcher_brand/name_left_2/?search=name_left_1:${letter}`);
                const brandsCoupleLetter = response.data.items.map(item => item.left_1);
                this.brandsCoupleLetter = brandsCoupleLetter;
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },

        async selectCoupleBrand(brandsCoupleLetter) {
            try {
                this.selectedCoupleBrand = brandsCoupleLetter;
                this.brandCoupleSelected = true;

                const response = await axios.get(`/filter/bidwatcher_brand/name/?search=name_left_2:${brandsCoupleLetter}`);
                const brands = response.data.items.map(item => item.name);
                this.brandList = brands;
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        },

        async selectBrandName(brand) {
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

                let letters = [];
                let numbers = [];

                familyOptions.forEach(item => {
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

        removeSelectedBrand(index) {
            this.selectedBrandFull.splice(index, 1);
        },

        async selectFamily(letter) {
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

                const filteredFamilies = response.data.items.filter(item => item.family_name.startsWith(letter));

                const familyNames = filteredFamilies.map(item => item.family_name);

                this.familyList = familyNames;
            } catch (error) {
                console.error('Errore nella richiesta GET:', error);
            }
        },

        async selectFamilyName(family) {
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

                this.modelList = response.data.items.map(item => item.model_name);
                
                this.selectedModel = null;
                
                this.familySelected = true;
            } catch (error) {
                console.error('Errore nella richiesta GET:', error);
            }
        },

        removeSelectedFamily(index) {
            this.selectedFamilyFull.splice(index, 1);
        },

        async selectModelName(model) {
            if (!this.selectedModelFull.includes(model)) {
                this.selectedModelFull.push(model);
            }

            this.modelSelected = true;

            this.familySelected = true;
        },

        removeSelectedModel(index) {
            this.selectedModelFull.splice(index, 1);
        },

        async fetchCountries() {
            try {
                const response = await axios.get('/filter/filter_charts_vehicles/country_brand_area/');
                this.countries = response.data.items; 
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

        async selectType(type) {
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

        async selectCategoryType(type, categoryType) {
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

        async selectCategoryName(categoryName) {
            if (!this.selectedCategoryName.includes(categoryName)) {
                this.selectedCategoryName.push(categoryName);
            }

        },

        removeSelectedCategoryName(index) {
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

        selectAttribute(attribute) {
            this.selectedAttribute = attribute;
            this.attributeSelected = true;
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

        async selectColour(colour) {
            this.selectedColour = colour;
            this.colourSelected = true;
    

            try {
                const response = await axios.get('/filter/filter_charts_vehicles/color_name/', {
                    params: {
                        search: `colorfamily_name:${colour}`
                    }
                });
                this.sfumature = response.data.items;
            } catch (error) {
                console.error('Errore nel recupero dei paesi:', error);
            }
        },

        selectColorSfumatura(color){
            this.selectedColor = color;
            this.colorSelected = true;
        },

        async selectCountry(country) {
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

        getImageUrl(countryFlag) {
        // Costruisci l'URL dell'immagine utilizzando il nome del paese
        const brandAbbreviation = countryFlag.substring(0, 3).toUpperCase();
            return `https://past-auction-p.s3.amazonaws.com/LogoCountry/${brandAbbreviation}.jpeg`;
        },

        async selectFlag(flag) {
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

        removeSelectedCountry(index) {
            this.selectedCountryChip.splice(index, 1);
        },

        selectPeriod(period) {
            this.selectedPeriod = period;
            this.periodSelected = true;
        },
        
        selectMiscellaneous(item, arrayName) {
            if (this.selectedMiscellaneous[arrayName] !== item) {
                this.selectedMiscellaneous[arrayName] = item;
            } else {
                this.selectedMiscellaneous[arrayName] = null;
            }
        },

        clearFilters() {
            this.selectedBrand= [];
            this.selectedBrandFull= [];
            this.selectedCoupleBrand= null;
            this.selectedFamily= null;
            this.selectedModel= null;
            this.selectedCountry= null;
            this.selectedType= null;
            this.selectedCategoryType= null;
            this.selectedAttribute= null;
            this.selectedPeriod= null;
            this.selectedColour= null;
            this.selectedColor= null;
            this.selectedMiscellaneous= null;
            this.selectedFilters= [];
            this.selectedFamilyFull= [];
            this.selectedModelFull= [];
            this.selectedCategoryName= [];
        },

        async previewDataset() {
            console.log(
                this.selectedBrandFull,
                this.selectedFamilyFull,
                this.selectedModelFull,
                this.selectedCountry,
                this.selectedCountryChip,
                this.selectedCategoryName,
                this.selectedAttribute,
                this.selectedPeriod,
                this.selectedColour,
                this.selectedColor,
                this.selectedMiscellaneous.miscOptionsSold,
                this.selectedMiscellaneous.miscOptionsQuote,
                this.selectedMiscellaneous.miscOptionChas)
                try {
                    const response = await axios.get('/bidwatcher_vehicle/query_v/', {
                        params: {
                            search: `brand_name:${this.selectedBrandFull},bw_family_name:${this.selectedFamilyFull}`
                        }
                    });
                    this.countries2 = response.data.items;
                } catch (error) {
                    console.error('Errore nel recupero dei paesi:', error);
                }
        }
    },
};
</script>


<style scoped>
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