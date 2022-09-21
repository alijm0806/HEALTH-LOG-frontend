

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
            <p>Austin, TX</p>
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
  color: rgb(6, 6, 6);
  display: flex;
  margin-left: 20 px;
  font-size: 18px;
  flex-direction: column;
  font-weight: 400;
}

.container-contact .contactInfo .box .text h3 {
  color: rgb(0, 85, 255);
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