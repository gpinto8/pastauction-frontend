<template>
  <div class="title_main_div adm_title">
    User Administrators
  </div>
  <div class="title_text">
    You can add up to 3 people

    <button class="add_admin_btn">
      + Add
    </button>
  </div>

  <div class="list_of_admins_mainbox">
      <table v-for="i in 2" :key="i"   class="adminlist_table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody  class="adminlist_tabletbody">

        <tr >
          <td><div class="tddiv">Nico</div></td>
          <td><div class="tddiv">Asadi</div></td>
          <td><div class="tddiv">3293290000</div></td>
          <td><div class="tddiv">nico@moh.com </div></td>
          <td></td>
          <td class="actiontd">
            <div class="edit_admin">
              <img src="@/assets/icons/whitepencil.svg" alt="edit">
            </div>
            <div class="delete_admin">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.8125 5.3125C3.92853 5.3125 4.03981 5.35859 4.12186 5.44064C4.20391 5.52269 4.25 5.63397 4.25 5.75V11C4.25 11.116 4.20391 11.2273 4.12186 11.3094C4.03981 11.3914 3.92853 11.4375 3.8125 11.4375C3.69647 11.4375 3.58519 11.3914 3.50314 11.3094C3.42109 11.2273 3.375 11.116 3.375 11V5.75C3.375 5.63397 3.42109 5.52269 3.50314 5.44064C3.58519 5.35859 3.69647 5.3125 3.8125 5.3125ZM6 5.3125C6.11603 5.3125 6.22731 5.35859 6.30936 5.44064C6.39141 5.52269 6.4375 5.63397 6.4375 5.75V11C6.4375 11.116 6.39141 11.2273 6.30936 11.3094C6.22731 11.3914 6.11603 11.4375 6 11.4375C5.88397 11.4375 5.77269 11.3914 5.69064 11.3094C5.60859 11.2273 5.5625 11.116 5.5625 11V5.75C5.5625 5.63397 5.60859 5.52269 5.69064 5.44064C5.77269 5.35859 5.88397 5.3125 6 5.3125ZM8.625 5.75C8.625 5.63397 8.57891 5.52269 8.49686 5.44064C8.41481 5.35859 8.30353 5.3125 8.1875 5.3125C8.07147 5.3125 7.96019 5.35859 7.87814 5.44064C7.79609 5.52269 7.75 5.63397 7.75 5.75V11C7.75 11.116 7.79609 11.2273 7.87814 11.3094C7.96019 11.3914 8.07147 11.4375 8.1875 11.4375C8.30353 11.4375 8.41481 11.3914 8.49686 11.3094C8.57891 11.2273 8.625 11.116 8.625 11V5.75Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.6875 3.125C11.6875 3.35706 11.5953 3.57962 11.4312 3.74372C11.2671 3.90781 11.0446 4 10.8125 4H10.375V11.875C10.375 12.3391 10.1906 12.7842 9.86244 13.1124C9.53425 13.4406 9.08913 13.625 8.625 13.625H3.375C2.91087 13.625 2.46575 13.4406 2.13756 13.1124C1.80937 12.7842 1.625 12.3391 1.625 11.875V4H1.1875C0.955436 4 0.732876 3.90781 0.568782 3.74372C0.404687 3.57962 0.3125 3.35706 0.3125 3.125V2.25C0.3125 2.01794 0.404687 1.79538 0.568782 1.63128C0.732876 1.46719 0.955436 1.375 1.1875 1.375H4.25C4.25 1.14294 4.34219 0.920376 4.50628 0.756282C4.67038 0.592187 4.89294 0.5 5.125 0.5H6.875C7.10706 0.5 7.32962 0.592187 7.49372 0.756282C7.65781 0.920376 7.75 1.14294 7.75 1.375H10.8125C11.0446 1.375 11.2671 1.46719 11.4312 1.63128C11.5953 1.79538 11.6875 2.01794 11.6875 2.25V3.125ZM2.60325 4L2.5 4.05163V11.875C2.5 12.1071 2.59219 12.3296 2.75628 12.4937C2.92038 12.6578 3.14294 12.75 3.375 12.75H8.625C8.85707 12.75 9.07963 12.6578 9.24372 12.4937C9.40781 12.3296 9.5 12.1071 9.5 11.875V4.05163L9.39675 4H2.60325ZM1.1875 3.125V2.25H10.8125V3.125H1.1875Z" fill="white"/>
              </svg>

            </div>
          </td>
        </tr>

      </tbody>
    </table>
  </div>


  <!--  USERS SECTION  -->
  <div class="title_main_div">
    Users (5)
  </div>
  <div class="title_text">
    Here you can find users invited
    <button class="add_admin_btn">
      + Add
    </button>
  </div>

  <section class="content_box_of_users_list">
    <div class="list_of_records">
      <div class="record_userslist" v-for="i in 20" :key="i">IoSonoNico</div>
    </div>
  </section>





  <!--  ENTITIES SECTION  -->
  <div class="title_main_div">
    Entities (3)
  </div>
  <div class="title_text">
    Here you can find entities invited
    <button class="add_admin_btn">
      + Add
    </button>
  </div>

  <section class="content_box_of_users_list">
    <div class="list_of_records">
      <div class="record_userslist" v-for="i in 20" :key="i">Classic Car Store</div>
    </div>
  </section>

</template>
<style scoped>

.actiontd {
  text-align: right;
}
.list_of_admins_mainbox {
  .adminlist_table {
    width: 100%;
    text-align: left;
    margin-top: 35px;
  }
}
.title_text {
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;

  .add_admin_btn {
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #0D6EFD;
    border-bottom: 2px solid;
    padding: inherit;
    float: right;
  }
}

.delete_admin {
  background-color: red;
  text-align: center;
  margin-left: 10px;
  display: inline-block;
  border-radius: 50px;
  padding: 8px;
  svg {
    width: 12px;
  }
}
.edit_admin {
  background: #0D6EFD;
  text-align: center;
  display: inline-block;
  border-radius: 50px;
  padding: 8px;
  img {
    width: 12px;
  }
}
.tddiv   {
  border-bottom: 1px solid #CECECE;
  padding: 15px 5px 20px 0;
  margin: 0 30px 0 0;
  text-align: left;
}
.title_main_div {
  &.adm_title {
    margin-top: 35px;
  }
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  text-align: left;
  margin-top: 5vw;
}
::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

/* Customize the scrollbar thumb (the draggable part) */
::-webkit-scrollbar-thumb {
  background-color: #cfd5db; /* Thumb color */
  border-radius: 10px; /* Rounded thumb */
}

/* Optional: customize the scrollbar track (the background) */
::-webkit-scrollbar-track {
  background-color: #f5f5f5; /* Track color */
}

/* For Mozilla Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #cfd5db #f5f5f5;
}
.content_box_of_users_list {
  height: 120px;
  background: #fff;
  margin-top: 30px;
  border-radius: 12px;
  padding: 12px 5%;
  overflow: hidden;
  .list_of_records {
    height: 100%;
    overflow-y: auto;

    .record_userslist{
      max-width: 400px;

      border-bottom: 1px solid #CECECE;
      line-height: 29px;
      font-size: 15px;
    }
  }
}
</style>

<script setup lang="ts">
</script>
