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
                    <p v-if="!brandSelected">Please, select the Brand of your interest first.</p>
                    <v-btn v-else
                        v-for="letter in alphabet"
                        :key="'family_' + letter"
                        class="letter-button"
                        :variant="selectedFamily ===letter ? 'elevated' : 'outlined'"
                        @click="selectFamily(letter)"
                        color="black"
                        text
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                        {{ letter }}
                    </v-btn>
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
                       <small>Model</small>
                    </v-chip>
                    <p v-if="!familySelected">Please, select the Family of your interest first.</p>
                    <v-btn v-else
                        v-for="letter in alphabet"
                        :key="'model_' + letter"
                        class="letter-button"
                        :variant="selectedModel === letter ? 'elevated' : 'outlined'"
                        @click="selectModel(letter)"
                        color="black"
                        text
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                        >
                        {{ letter }}
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
                        <small>Countries</small>
                    </v-chip>
                    <v-btn
                        v-for="country in countries"
                        :key="country"
                        class="letter-button"
                        :variant="selectedCountry === country ? 'elevated' : 'outlined'"
                        @click="selectCountry(country)"
                        color="black"
                        text
                        style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                    >
                        {{ country }}
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
                    <small>Types</small>
                </v-chip>
                <v-btn
                    v-for="type in types"
                    :key="type"
                    class="letter-button"
                    :variant="selectedType === type ? 'elevated' : 'outlined'"
                    @click="selectType(type)"
                    :color="selectedType === type ? 'black' : ''"
                    text
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ type }}
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
                    <small>Attributes</small>
                </v-chip>
                <v-btn
                    v-for="attribute in attributes"
                    :key="attribute"
                    class="letter-button"
                    :variant="selectedAttribute === attribute ? 'elevated' : 'outlined'"
                    @click="selectAttribute(attribute)"
                    :color="selectedAttribute === attribute ? 'black' : ''"
                    text
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ attribute }}
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
                    :key="period.label"
                    class="letter-button"
                    :variant="selectedPeriod === period ? 'elevated' : 'outlined'"
                    @click="selectPeriod(period)"
                    :color="selectedPeriod === period ? 'black' : ''"
                    text
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ period.label }}
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
                    :key="colour"
                    class="letter-button"
                    :variant="selectedColour === colour ? 'elevated' : 'outlined'"
                    @click="selectColour(colour)"
                    :color="selectedColour === colour ? 'black' : ''"
                    text
                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                >
                    {{ colour }}
                </v-btn>
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
                            <div>
                                <v-btn
                                    v-for="item in miscOptionsSold"
                                    :key="item"
                                    class="letter-button"
                                    :variant="selectedMiscellaneous === item ? 'elevated' : 'outlined'"
                                    @click="selectMiscellaneous(item)"
                                    :color="selectedMiscellaneous === item ? 'black' : ''"
                                    text
                                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                                >
                                    {{ item }}
                                </v-btn>
                            </div>
                            <div>
                                <v-btn
                                    v-for="item in miscOptionsQuote"
                                    :key="item"
                                    class="letter-button"
                                    :variant="selectedMiscellaneous === item ? 'elevated' : 'outlined'"
                                    @click="selectMiscellaneous(item)"
                                    :color="selectedMiscellaneous === item ? 'black' : ''"
                                    text
                                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                                >
                                    {{ item }}
                                </v-btn>
                            </div>
                            <div>
                                <v-btn
                                    v-for="item in miscOptionChas"
                                    :key="item"
                                    class="letter-button"
                                    :variant="selectedMiscellaneous === item ? 'elevated' : 'outlined'"
                                    @click="selectMiscellaneous(item)"
                                    :color="selectedMiscellaneous === item ? 'black' : ''"
                                    text
                                    style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                                >
                                    {{ item }}
                                </v-btn>
                            </div>
                        </div>
                        <div>
                            <v-btn
                                v-for="item in miscOptionsSecondBlock"
                                :key="item"
                                class="letter-button"
                                :variant="selectedMiscellaneous === item ? 'elevated' : 'outlined'"
                                @click="selectMiscellaneous(item)"
                                :color="selectedMiscellaneous === item ? 'black' : ''"
                                text
                                style="min-width: 20px; margin: 2px; border-radius: 0px; font-size: 10px;"
                            >
                                {{ item }}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="d-flex justify-end">
                    <v-btn size="small" class="mr-2" variant="outlined" color="black" @click="this.$router.push({ name: 'Charts' });">Back</v-btn>
                    <v-btn size="small" class="float-right" color="black" @click="goToDashboard">Preview data set</v-btn>
                </div>
            </v-col>
        </v-row>

    </v-container>
    </div>
</template>

<script>
import router from '@/router/index';

export default {
    data() {
        return {
            brandSelected: false,
            familySelected: false,
            modelSelected: false,
            selectedBrand: null,
            selectedFamily: null,
            selectedModel: null,
            selectedCountry: null,
            countrySelected: false,
            selectedType: null,
            typeSelected: false,
            attributes: ['Anniversary', 'Custom', 'Hardtop', 'LWB', 'Military', 'Pedal', 'Project', 'Race', 'Rally', 'Replica', 'SWB', 'VIP'],
            selectedAttribute: null,
            attributeSelected: false,
            types: ['Boat', 'Car', 'Motorbike', 'Tractor', 'Utility', 'Other'],
            alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
            countries: ['Africa', 'America', 'Asia', 'Europe', 'Japan', 'Middle East', 'Oceania', 'UK'],
            periods: [
                { label: 'Antique 1880-1904' },
                { label: 'Veteran 1905-1918' },
                { label: 'Vintage 1919-1930' },
                { label: 'Post Vintage 1931-1945' },
                { label: 'Classic 1946-1964' },
                { label: 'Post classic 1965-1974' },
                { label: 'Modern 1975-1999' },
                { label: 'Contemporary 2000-2020' },
                { label: 'N/A' },
                { label: 'None' }
            ],
            selectedPeriod: null,
            periodSelected: false,
            colours: ['Black', 'Blue', 'Brown', 'Green', 'Grey', 'Red', 'White', 'Yellow'],
            selectedColour: null,
            colourSelected: false,
            miscOptionsSold: ['Sold', 'Not sold'],
            miscOptionsQuote: ['Quoted', 'Not quoted'],
            miscOptionChas: ['With chassis', 'Without chassis'],
            miscOptionsFirstBlock: ['Sold', 'Not sold', 'Quoted', 'Not quoted', 'With chassis', 'Without chassis'],
            miscOptionsSecondBlock: ['AUD', 'CAD', 'CHF', 'DKK', 'EAD', 'GBP', 'JPY', 'MXN', 'PLN', 'RNB', 'RUB', 'SEK', 'USD'],
            selectedMiscellaneous: null,
            miscellaneousSelected: false,
            selectedFilters: []
        };
    },
    methods: {
        selectBrand(letter) {
            this.selectedBrand = letter;
            this.brandSelected = true;
            this.familySelected = false; 
            this.modelSelected = false; 
            this.countrySelected = false; 
        },
        selectFamily(letter) {
            this.selectedFamily = letter;
            this.familySelected = true;
            this.modelSelected = false;
            this.countrySelected = false; 
        },
        selectModel(letter) {
            this.selectedModel = letter;
            this.modelSelected = true;
            this.countrySelected = false; 
        },
        selectCountry(country) {
            this.selectedCountry = country;
            this.countrySelected = true;
        },
        selectType(type) {
            this.selectedType = type;
            this.typeSelected = true;
        },
        selectAttribute(attribute) {
            this.selectedAttribute = attribute;
            this.attributeSelected = true;
        },
        selectPeriod(period) {
            this.selectedPeriod = period;
            this.periodSelected = true;
        },
        selectColour(colour) {
            this.selectedColour = colour;
            this.colourSelected = true;
        },
        selectMiscellaneous(misc) {
            this.selectedMiscellaneous = misc;
            this.miscellaneousSelected = true;
        },

        clearFilters() {
            this.selectedBrand = null;
            this.selectedFamily = null;
            this.selectedModel = null;
            this.selectedCountry = null;
            this.selectedType = null;
            this.selectedAttribute = null;
            this.selectedPeriod = null;
            this.selectedColour = null;
            this.selectedMiscellaneous = null;
        },

        goToDashboard() {
            if (
                this.selectedBrand &&
                this.selectedFamily &&
                this.selectedModel &&
                this.selectedCountry &&
                this.selectedType &&
                this.selectedAttribute &&
                this.selectedPeriod &&
                this.selectedColour &&
                this.selectedMiscellaneous
            ) {
                this.$router.push({ path: '/charts/filters/brand' });
            } else {
                // Gestisci il caso in cui non tutti i filtri sono stati selezionati
                // Ad esempio, puoi mostrare un messaggio di errore all'utente
                console.log('Per favore, seleziona tutti i filtri prima di procedere.');
            }
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
</style>