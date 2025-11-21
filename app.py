from flask import Flask, render_template, request
import pymysql
app = Flask(__name__)

#  Conexión

def conectar():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="",
        database="formulario_umb",
        cursorclass=pymysql.cursors.DictCursor
    )

#  Rutas
@app.route('/')
def inicio():
    return render_template("index.html")

@app.route('/contacto')
def contacto():
    return render_template("contacto.html")

@app.route('/formulario')
def formulario():
    return render_template("formulario.html")

@app.route('/agronomia')
def agronomia():
    return render_template("agronomia.html")

@app.route('/asignaturas_agronomia')
def asignaturas_agronomia():
    return render_template("asignaturas_agronomia.html")

@app.route('/asignaturas_contaduria')
def asignaturas_contaduria():
    return render_template("asignaturas_contaduria.html")

@app.route('/asignaturas_sistemas')
def asignaturas_sistemas():
    return render_template("asignaturas_sistemas.html")

@app.route('/contaduria')
def contaduria():
    return render_template("contaduria.html")

@app.route('/sistemas')
def sistemas():
    return render_template("sistemas.html")


#  Guardar datos
@app.route('/guardar_cita', methods=['POST'])
def guardar_cita():
    datos = request.form

    nombre = datos.get("nombre")
    telefono = datos.get("telefono")
    correo = datos.get("correo")
    fecha = datos.get("fecha")
    hora = datos.get("hora") 
    motivo = datos.get("motivo")

    conn = conectar()
    cursor = conn.cursor()

    sql = """
    INSERT INTO citas (nombre, telefono, correo, fecha, hora, motivo)
    VALUES (%s, %s, %s, %s, %s, %s)
    """

    cursor.execute(sql, (nombre, telefono, correo, fecha, hora, motivo))
    conn.commit()

    cursor.close()
    conn.close()

    return "OK"

if __name__ == "__main__":
    app.run(debug=True)
