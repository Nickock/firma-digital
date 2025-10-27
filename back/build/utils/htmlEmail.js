"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlWelcomeEmail = void 0;
exports.default = htmlEmail;
function htmlEmail(data) {
    console.log(data);
    return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.title}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: Arial, sans-serif">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa">
      <tr>
        <td align="center" style="padding: 20px 0">
          <!-- Contenedor principal -->
          <table
            width="600"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08)"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #17cf54 0%, #2a56d6 100%);
                  padding: 30px 40px;
                  text-align: center;
                  color: white;
                "
              >
                <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px">SecureID</div>
                <div style="font-size: 16px; font-weight: 300; opacity: 0.9">
                  Identificación electrónica
                </div>
              </td>
            </tr>

            <!-- Contenido -->
            <tr>
              <td style="padding: 40px">
                <h1 style="font-size: 28px; color: #2d3748; margin-bottom: 20px; text-align: center; font-weight: 600">
                  ${data.title}
                </h1>

             

              


                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0">
                  <tr>
                    <td style="background: #f7f9fc; border-radius: 12px; padding: 15px; margin-bottom: 20px">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="36" valign="top">
                           
                          </td>
                          <td style="line-height:20px">
                          ${data.messages
        ?.map((msg) => {
        return `<p style="font-size: 14px; color: #718096; margin: 0">
                              ${msg}
                            </p>
                            `;
    })
        .join('')}
                            
                             <p style="font-size: 14px; color: #718096; margin: 0">
                              Este es tu codigo de activación de email.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background: #f7f9fc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0">
                <!-- Iconos sociales -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 20px auto">
                  <tr>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >f</a
                      >
                    </td>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >in</a
                      >
                    </td>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >t</a
                      >
                    </td>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >ig</a
                      >
                    </td>
                  </tr>
                </table>

                <!-- Enlaces footer -->
                <div style="margin: 20px 0">
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Términos y Condiciones</a
                  >
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Política de Privacidad</a
                  >
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Centro de Ayuda</a
                  >
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Contáctanos</a
                  >
                </div>

                <!-- Copyright -->
                <div style="color: #a0aec0; font-size: 14px; margin-top: 20px">
                  © 2025 SecureID.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
const htmlWelcomeEmail = (user = 'Usuario', code = '123-456-789') => {
    return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenido a SecureID </title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f7fa; font-family: Arial, sans-serif">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa">
      <tr>
        <td align="center" style="padding: 20px 0">
          <!-- Contenedor principal -->
          <table
            width="600"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08)"
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #17cf54 0%, #2a56d6 100%);
                  padding: 30px 40px;
                  text-align: center;
                  color: white;
                "
              >
                <div style="font-size: 28px; font-weight: bold; margin-bottom: 10px; letter-spacing: 1px">SecureID</div>
                <div style="font-size: 16px; font-weight: 300; opacity: 0.9">
                  Identificación electrónica
                </div>
              </td>
            </tr>

            <!-- Contenido -->
            <tr>
              <td style="padding: 40px">
                <h1 style="font-size: 28px; color: #2d3748; margin-bottom: 20px; text-align: center; font-weight: 600">
                  ¡Bienvenido, <span style="color: #4a6fff">${user.split('@')[0]}</span>!
                </h1>

                <p style="color: #4a5568; line-height: 1.6; margin-bottom: 30px; text-align: center; font-size: 16px">
                  Nos alegra enormemente que te hayas unido a nuestra comunidad. En SecureID estamos comprometidos con la seguridad electrónica y la confiabilidad de nuestro sistema.
                </p>

                <!-- Características -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0">
                  <tr>
                    <td
                      width="48%"
                      style="
                        background: #f7f9fc;
                        border-radius: 12px;
                        padding: 20px;
                        text-align: center;
                        border: 1px solid #e2e8f0;
                      "
                    >
                      <div style="font-size: 24px; margin-bottom: 10px">🚀</div>
                      <h3 style="font-weight: 600; color: #2d3748; margin-bottom: 8px; font-size: 16px">
                        Firma rápida
                      </h3>
                      <p style="font-size: 14px; color: #718096">Aprobación instantánea en nuestros locales</p>
                    </td>
                    <td width="4%"></td>
                    <td
                      width="48%"
                      style="
                        background: #f7f9fc;
                        border-radius: 12px;
                        padding: 20px;
                        text-align: center;
                        border: 1px solid #e2e8f0;
                      "
                    >
                      <div style="font-size: 24px; margin-bottom: 10px">🛡️</div>
                      <h3 style="font-weight: 600; color: #2d3748; margin-bottom: 8px; font-size: 16px">
                        Seguridad Garantizada
                      </h3>
                      <p style="font-size: 14px; color: #718096">Tus datos y transacciones están protegidos</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" style="height: 15px"></td>
                  </tr>
                  <tr>
                    <td
                      width="48%"
                      style="
                        background: #f7f9fc;
                        border-radius: 12px;
                        padding: 20px;
                        text-align: center;
                        border: 1px solid #e2e8f0;
                      "
                    >
                      <div style="font-size: 24px; margin-bottom: 10px">💼</div>
                      <h3 style="font-weight: 600; color: #2d3748; margin-bottom: 8px; font-size: 16px">
                        Asesoría Personalizada
                      </h3>
                      <p style="font-size: 14px; color: #718096">Expertos dedicados a tu crecimiento</p>
                    </td>
                    <td width="4%"></td>
                    <td
                      width="48%"
                      style="
                        background: #f7f9fc;
                        border-radius: 12px;
                        padding: 20px;
                        text-align: center;
                        border: 1px solid #e2e8f0;
                      "
                    >
                      <div style="font-size: 24px; margin-bottom: 10px">⚡</div>
                      <h3 style="font-weight: 600; color: #2d3748; margin-bottom: 8px; font-size: 16px">
                        Identidad universal
                      </h3>
                      <p style="font-size: 14px; color: #718096">Nustra firma es válida en todos los países de Latinoamérica</p>
                    </td>
                  </tr>
                </table>

                <!-- Botón CTA -->
                <!-- <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0">
                  <tr>
                    <td align="center">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          background: linear-gradient(135deg, #4a6fff 0%, #2a56d6 100%);
                          color: white;
                          padding: 16px 30px;
                          border-radius: 12px;
                          text-decoration: none;
                          font-weight: 600;
                          font-size: 18px;
                          box-shadow: 0 4px 15px rgba(74, 111, 255, 0.3);
                        "
                      >
                        Acceder a Mi Cuenta
                      </a>
                    </td>
                  </tr>
                </table>
 -->
                <!-- Pasos -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin: 30px 0">
                  <!-- Paso 1 -->
                  <tr>
                    <td style="background: #f7f9fc; border-radius: 12px; padding: 15px; margin-bottom: 20px">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="36" valign="top">
                            <div
                              style="
                                background: #4a6fff;
                                color: white;
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 36px;
                                font-weight: 600;
                              "
                            >
                              1
                            </div>
                          </td>
                          <td style="padding-left: 15px">
                            <h3 style="font-size: 16px; color: #2d3748; margin: 0 0 5px 0">Validar tu correo  ${code}</h3>
                            <p style="font-size: 14px; color: #718096; margin: 0">
                              Este es tu codigo de activación de email.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Paso 2 -->
                  <tr>
                    <td style="background: #f7f9fc; border-radius: 12px; padding: 15px; margin-bottom: 20px">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="36" valign="top">
                            <div
                              style="
                                background: #4a6fff;
                                color: white;
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 36px;
                                font-weight: 600;
                              "
                            >
                              2
                            </div>
                          </td>
                          <td style="padding-left: 15px">
                            <h3 style="font-size: 16px; color: #2d3748; margin: 0 0 5px 0">
                              Completa tu perfil
                            </h3>
                            <p style="font-size: 14px; color: #718096; margin: 0">
                              Ingresa tus datos en nuestro portal
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Paso 3 -->
                  <tr>
                    <td style="background: #f7f9fc; border-radius: 12px; padding: 15px">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="36" valign="top">
                            <div
                              style="
                                background: #4a6fff;
                                color: white;
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 36px;
                                font-weight: 600;
                              "
                            >
                              3
                            </div>
                          </td>
                          <td style="padding-left: 15px">
                            <h3 style="font-size: 16px; color: #2d3748; margin: 0 0 5px 0">
                              Agenda una cita
                            </h3>
                            <p style="font-size: 14px; color: #718096; margin: 0">
                              Para adjuntar tus datos biométricos en alguno de nuestros locales
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #f7f9fc; border-radius: 12px; padding: 15px">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="36" valign="top">
                            <div
                              style="
                                background: #4a6fff;
                                color: white;
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 36px;
                                font-weight: 600;
                              "
                            >
                              4
                            </div>
                          </td>
                          <td style="padding-left: 15px">
                            <h3 style="font-size: 16px; color: #2d3748; margin: 0 0 5px 0">
                              Crea tu firma
                            </h3>
                            <p style="font-size: 14px; color: #718096; margin: 0">
                              Puedes crear una frima digital que se agregará en los documentos que firmes
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="background: #f7f9fc; border-radius: 12px; padding: 15px">
                      <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="36" valign="top">
                            <div
                              style="
                                background: #4a6fff;
                                color: white;
                                width: 36px;
                                height: 36px;
                                border-radius: 50%;
                                text-align: center;
                                line-height: 36px;
                                font-weight: 600;
                              "
                            >
                              5
                            </div>
                          </td>
                          <td style="padding-left: 15px">
                            <h3 style="font-size: 16px; color: #2d3748; margin: 0 0 5px 0">
                              Listo!
                            </h3>
                            <p style="font-size: 14px; color: #718096; margin: 0">
                              Tu identidad electrónica esta lista!
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background: #f7f9fc; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0">
                <!-- Iconos sociales -->
                <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 20px auto">
                  <tr>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >f</a
                      >
                    </td>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >in</a
                      >
                    </td>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >t</a
                      >
                    </td>
                    <td style="padding: 0 8px">
                      <a
                        href="#"
                        style="
                          display: inline-block;
                          width: 40px;
                          height: 40px;
                          border-radius: 50%;
                          background: #e2e8f0;
                          color: #4a5568;
                          text-decoration: none;
                          text-align: center;
                          line-height: 40px;
                        "
                        >ig</a
                      >
                    </td>
                  </tr>
                </table>

                <!-- Enlaces footer -->
                <div style="margin: 20px 0">
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Términos y Condiciones</a
                  >
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Política de Privacidad</a
                  >
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Centro de Ayuda</a
                  >
                  <a href="#" style="color: #4a5568; text-decoration: none; margin: 0 10px; font-size: 14px"
                    >Contáctanos</a
                  >
                </div>

                <!-- Copyright -->
                <div style="color: #a0aec0; font-size: 14px; margin-top: 20px">
                  © 2025 SecureID.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `;
};
exports.htmlWelcomeEmail = htmlWelcomeEmail;
//# sourceMappingURL=htmlEmail.js.map