<template>

  <section class="contact">
    <div class="content">
      <h2>Contact Us</h2>
      <p>Lorem ipsum dolor ..................... Lorem ipsum dolor ..................... Lorem ipsum dolor
        ..................... Lorem ipsum dolor ..................... Lorem ipsum dolor ..................... Lorem
        ipsum dolor ..................... Lorem ipsum dolor ..................... Lorem ipsum dolor
        ..................... Lorem ipsum dolor ..................... Lorem ipsum dolor ..................... Lorem
        ipsum dolor ..................... Lorem ipsum dolor ..................... Lorem ipsum dolor
        ..................... Lorem ipsum dolor .....................</p>
    </div>
    <div class="container-contact">
      <div class="contactInfo">
        <div class="box">
          <div class="icon">
            <i class="material-icons" id="contact-icons">
              pin_drop
            </i>
          </div>
          <div class="text">
            <h3>Address</h3>
            <p>Congress st, Austin, TX</p>
          </div>
        </div>

        <div class="box">
          <div class="icon">
            <i class="material-icons" id="contact-icons" aria-hidden="true">phone</i>
          </div>
          <div class="text">
            <h3>Phone</h3>
            <p>123-456-7890</p>
          </div>
        </div>

        <div class="box">
          <div class="icon">
            <i class="material-icons" id="contact-icons" aria-hidden="true">email</i>
          </div>
          <div class="text">
            <h3>Email</h3>
            <p>contactus@health-log.com</p>
          </div>
        </div>

      </div>

      <div class="contactForm">
        <form>
          <h1>Send Message</h1>
          <div class="inputBox">
            <input type="text" name="" required="required">
            <div class="messages">Full Name</div>
          </div>
          <div class="inputBox">
            <input type="text" name="" required="required">
            <div class="messages">Email</div>
          </div>
          <div class="inputBox">
            <textarea required="required"></textarea>
            <div class="messages">Type your message....</div>
          </div>
          <div class="inputBox">
            <input type="submit" required="required" value="Send">
          </div>

          <div class="wrapper">
            <div class="icon facebook">
              <div class="toolip">Facebook</div>
              <span><i class="fa-brands fa-facebook"></i></span>
            </div>
            <div class="icon twitter">
              <div class="toolip">Twitter</div>
              <span><i class="fa-brands fa-twitter"></i></span>
            </div>
            <div class="icon instagram">
              <div class="toolip">Instagram</div>
              <span><i class="fa-brands fa-instagram"></i></span>
            </div>
            <div class="icon whatsapp">
              <div class="toolip">whatsapp</div>
              <span><i class="fa-brands fa-whatsapp"></i></span>
            </div>
          </div>


        </form>
      </div>
    </div>

  </section>



</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
  
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;

}

.wrapper {
  display: inline-flex;
  margin-top: 70px
}

.wrapper .icon {
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon span {
  position: relative;
  height: 60px;
  width: 60px;
  display: block;
  background: #fff;
  text-align: center;
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}



.wrapper .icon span i {
  line-height: 60px;
  font-size: 25px;
}

.wrapper .icon:hover span {
  color: #fff;
}

.wrapper .icon .toolip {
  position: absolute;
  top: 0px;
  background: #fff;
  color: #fff;
  font-size: 20px;
  padding: 10px 18px;
  border-radius: 25%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .toolip {
  opacity: 1;
  pointer-events: auto;
  top: -70px;
}

.wrapper .icon .toolip:before {
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  background: #fff;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover span,
.wrapper .icon:hover .toolip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.4);
}

.wrapper .facebook:hover span,
.wrapper .facebook:hover .toolip,
.wrapper .facebook:hover .toolip:before {
  background: #3B5999;
}

.wrapper .twitter:hover span,
.wrapper .twitter:hover .toolip,
.wrapper .twitter:hover .toolip:before {
  background: #46C1F6;
}

.wrapper .instagram:hover span,
.wrapper .instagram:hover .toolip,
.wrapper .instagram:hover .toolip:before {
  background: #e1306c;
}

.wrapper .whatsapp:hover span,
.wrapper .whatsapp:hover .toolip,
.wrapper .whatsapp:hover .toolip:before {
  background: #31c345;
}

.contact {
  position: relative;
  min-height: 100vh;
  padding: 50px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgb(0, 0, 0, 0.1)url("../assets/AdobeStock_268081648.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: -700px;

}

.contact .content {
  max-width: 800px;
  text-align: center;

}

.contact .content h2 {
  font-size: 50px;
  font-weight: 500;
  color: rgb(0, 85, 255);

}


.contact .content p {
  font-size: 20px;
  font-weight: 300;
  color: rgb(16, 16, 16);
  margin-bottom: 50px;

}

.container-contact {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.container-contact .contactInfo {
  width: 50%;
  display: flex;
  flex-direction: column;

}

.container-contact .contactInfo .box {
  position: relative;
  display: flex;
  padding: 20px 0;

}

.container-contact .contactInfo .box #contact-icons {
  min-width: 60px;
  height: 60px;
  background: rgb(16, 16, 16);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 35px;
}

.container-contact .contactInfo .box .text {
  color: #4ade80;
  display: flex;
  margin-left: 20 px;
  font-size: 18px;
  flex-direction: column;
  font-weight: 400;
}

.container-contact .contactInfo .box .text h3 {
  color: white;
  font-weight: 500;
}

.contactForm {
  width: 60%;
  padding: 40px;
  background: rgb(255, 255, 255, 0.5);
}


.contactForm h1 {
  font-size: 30px;
  color: #333;
  font-weight: 500;
  margin-bottom: 10px
}


.contactForm .inputBox {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.contactForm .inputBox input,
.contactForm .inputBox textarea {
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid #333;
  outline: none;
  resize: none;
}

.contactForm .inputBox .messages {
  /* position: absolute; */
  display: inline-block;
  left: 0;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  pointer-events: none;
  transform: translateY(-60px);
  color: #666;
}


.contactForm .inputBox input:focus~.messages,
.contactForm .inputBox input:valid~.messages {
  color: #e91e63;
  font-size: 20px;
  transform: translateY(-90px);

}


.contactForm .inputBox textarea:focus~.messages,
.contactForm .inputBox textarea:valid~.messages {
  color: #e91e63;
  font-size: 20px;
  transform: translateY(-120px);

}

.contactForm .inputBox input[type="submit"] {
  width: 100px;
  background: #00bcd4;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
}

@media (max-width: 991px) {
  .contact {
    padding: 50px;
  }

  .container-contact {
    flex-direction: column;
  }

  .container-contact .contactInfo {
    margin-bottom: 40 px;
  }

  .container-contact .contactInfo,
  .contactForm {
    width: 100%;
  }





}
</style>