<template>
    <div class="q-pa-md">
        <h4>Información basica de la plantilla</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">El siguiente enlace corresponde a la documentación completa del framework QUASAR, encontraras la descripcion, los elementos que la conforman y en caso de ser necesario la configuración y variantes de los elementos aqui listados</label> <br>
                        <label class="text-bold"> <a href="https://quasar.dev/" target="_blank"> Link al sitio del framework </a></label> <br> 
                    </div>
                    <div class="col-3">
                        <label class="text-bold">El color morado del encabezado, footer y menu, esta configurado con la etiqueta purple-ieen, para usarlo en las etiquetas color: purple-ieen, como background bg-purple-ieen o texto, text-color: purple-ieen</label>
                    </div>
                    <div class="col-3">
                        <label class="text-bold"></label>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div>
        <h4>Opciones de Botones</h4>
        <div class="column">  
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">               
                    <div class="col-3">
                        <label class="text-bold">IconButton dentro de las tablas, <a href="https://fonts.google.com/icons" target="_blank"> Link a los iconos </a></label> <br>          
                        <q-btn flat round color="primary" icon="card_giftcard" />
                        <q-btn flat round color="secondary" icon="favorite_border" />
                        <q-btn flat round color="accent" icon="face" />
                    </div>
                    <div class="col-3 q-gutter-sm">
                        <label class="text-bold">Buttons outlined, Aceptar a la derecha, cancelar a la izquierda </label> <br>                         
                        <q-btn color= "negative" label="Cancelar" /> 
                        <q-btn color= "positive" label="Aceptar" /><br>
                        <q-btn outline color= "negative" label="Cancelar" /> 
                        <q-btn outline color= "positive" label="Aceptar" />
                    </div>
                        
                    <div class="col-3 q-gutter-sm">
                        <label class="text-bold">Boton para esperar las peticiones</label><br>
                        <q-btn
                            type="submit"
                            :loading="submitting"
                            label="Ejemplo"
                            class="q-mt-md"
                            color="purple-ieen"
                            @click="submitting=true"
                        >
                            <template v-slot:loading>
                            <q-spinner-facebook />
                            </template>
                        </q-btn>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold">Botones con icono a la derecha</label> <br>
                        <q-btn color="purple-ieen" icon-right="mail" label="Ejemplo" />
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">               
                    <div class="col-3">
                        <label class="text-bold">Botones despegrables con opciones</label> <br>          
                        <q-btn-dropdown color="purple-ieen" label="Boton despegable">
                            <q-list>
                                <q-item clickable v-close-popup @click="onItemClick">
                                <q-item-section>
                                    <q-item-label>Fotos</q-item-label>
                                </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup @click="onItemClick">
                                <q-item-section>
                                    <q-item-label>Videos</q-item-label>
                                </q-item-section>
                                </q-item>

                                <q-item clickable v-close-popup @click="onItemClick">
                                <q-item-section>
                                    <q-item-label>Articulos</q-item-label>
                                </q-item-section>
                                </q-item>
                            </q-list>
                         </q-btn-dropdown>
                    </div>                   
                </div>
            </div>                     
        </div>
        <h4>Opciones de input</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">            
                    <div class="col-3">
                        <label class="text-bold">Campo de texto sencillo</label> <br>          
                    <q-input v-model="text" label="Ejemplo" type="text"/>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Campo de texto con opción de borrado</label> <br>          
                    <q-input v-model="text1" label="Ejemplo" type="text" clearable />
                    </div>
                    <div class="col-3" >
                        <label class="text-bold">Para definir el tipo de input, agregar la etiqueta "type"</label> <br>
                        <label class="text-bold">tipos de input: text, password, textarea, email, search, tel, file, number, url, time, date</label>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold">Campo Select</label>
                        <q-select v-model="model" :options="options" label="Seleccione" />
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">   
                    <div class="col-3">
                        <label class="text-bold">Campo para cargar archivos</label> <br> 
                        <q-file v-model="model" label="Cargar Archivo" clearable>
                            <template v-slot:prepend>
                            <q-icon name="attach_file" />
                            </template>
                        </q-file>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Radio buttons </label>
                        <div class="q-gutter-sm">
                            <q-radio v-model="shape" val="Ejemplo 1" label="Ejemplo 1" color="purple-ieen"/>
                            <q-radio v-model="shape" val="Ejemplo 2" label="Ejemplo 2" color="purple-ieen"/>
                            <q-radio v-model="shape" val="Ejemplo 3" label="Ejemplo 3" color="purple-ieen"/>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">CheckBox buttons </label>
                         <div class="q-pa-md">
                            <div class="q-gutter-sm">
                                <q-checkbox v-model="Opcion1" label="Opción 1" color="purple-ieen"/>
                                <q-checkbox v-model="Opcion2" label="Opción 2" color="purple-ieen"/>
                            </div>                       
                        </div>
                    </div>
                    <div class="col-2 q-gutter-sm"> 
                        <div class="q-gutter-y-md">
                             <label class="text-bold">  Botones de seleccion (button toggle) </label>
                            <q-btn-toggle
                                v-model="modelbutton"
                                spread
                                no-caps
                                toggle-color="purple-ieen"
                                color="white"
                                text-color="black"
                                :options="[
                                {label: 'Opción 1', value: 'one'},
                                {label: 'Opción 2', value: 'two'}
                                ]"
                            />
                        </div>
                    </div>
                </div>
            </div> 
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">   
                    <div class="col-3">
                        <label class="text-bold">  Check agrupados de elección </label>
                        <div class="q-pa-sm">                        
                            <q-option-group
                            v-model="eleccion"
                            :options="optionsb"                           
                            color="purple-ieen"
                            inline
                            />
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">  check agrupados de multiple elección </label>
                        <div class="q-pa-sm">                        
                            <q-option-group
                            v-model="multiple"
                            :options="optionsb"
                            type="checkbox"
                            color="purple-ieen"
                            inline
                            />
                        </div>
                    </div>             
                </div>
            </div>               
        </div>
        <h4>Validación de los campos en un Form</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Validación de campo de texto</label><br>
                         <q-input
                            ref="inputRef"
                            filled
                            v-model="ModelValidacion"
                            label="Dato solicitado"
                            :rules="[val => !!val || 'Este campo es requerido']"
                        />
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Validación de tamaño de cadena de texto(contador incluido)</label><br>
                        <q-input
                            ref="inputRef"
                            filled
                            v-model="model"
                            counter
                            label="Maximo 5 caracteres"
                            :rules="[ val => val.length <= 5 || 'Por favor ingrese maximo 5 caracteres']"
                        />
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Validación de formulario</label><br>
                        <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset" class="q-gutter-md">
                            <q-input
                                ref="nameRef"
                                filled
                                v-model="name"
                                label="Nombre *"
                                hint="Nombre y apellidos"
                                lazy-rules
                                :rules="nameRules"
                            />

                            <q-input
                                ref="ageRef"
                                filled
                                type="number"
                                v-model="age"
                                label="Edad *"
                                lazy-rules
                                :rules="ageRules"
                            />

                            
                            <div>
                                <q-btn label="Guardar" type="submit" color="primary" />
                                <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
                            </div>
                        </form>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div>
        <h4>Opciones de imagenes</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">            
                    <div class="col-3">
                        <label class="text-bold">Las imagenes a mostrar dentro del sistema tendran el aspecto 4/3</label><br>
                        <q-img
                        src="https://placeimg.com/500/300/nature"
                        :ratio="4/3" width="320px" height="240px"
                        
                        />
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold">Para mantener esta relación de aspecto, los tamaños son los siguientes(width - height)</label><br>
                        <q-list> 
                            <q-item dense>
                                <q-item-label>°1600 x 1200</q-item-label>
                            </q-item>
                             <q-item dense>
                                <q-item-label>°1400 x 1050</q-item-label>
                            </q-item>
                             <q-item dense>
                                <q-item-label>°1280 x 960</q-item-label>
                            </q-item>
                             <q-item dense>
                                <q-item-label>°800 x 600</q-item-label>
                            </q-item>
                             <q-item dense>
                                <q-item-label>°640 x 480</q-item-label>
                            </q-item>
                             <q-item dense>
                                <q-item-label>°320 x 240</q-item-label>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Si las imagenes requieren texto descriptivo, agregar el siguiente efecto</label><br>
                       <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"
                       :ratio="4/3" width="320px" height="240px">
                        <div class="absolute-bottom text-subtitle1 text-center">
                            Texto descriptivo
                        </div>
                        </q-img>
                    </div>
                    <div class="col-3" >
                        <label class="text-bold">En caso de utilizar un carrusel de imagenes, usar siguiente formato(definir el height con los tamaños del aspecto 4:3)</label>
                        <q-carousel
                            animated
                            v-model="slide"
                            navigation
                            infinite
                            :autoplay="autoplay"
                            arrows                          
                            transition-prev="slide-right"
                            transition-next="slide-left"
                            @mouseenter="autoplay = false"
                            @mouseleave="autoplay = true"
                            height="240px"                        
                            >
                            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
                            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
                        </q-carousel>
                    </div>                
                </div>
            </div>          
        </div>
        <h4>Opciones de Cards</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold"> Ejemplo de Card basica</label>
                        <q-card class="my-card">
                            <q-card-section>
                                {{ lorem }}
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-3">
                        <label class="text-bold"> Ejemplo de Card con color</label>
                        <q-card  bordered class="my-card text-white bg-purple-ieen" >

                            <q-card-section>
                                {{ lorem }}
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Card con encabezado y footer</label>
                        <q-card class="my-card">
                            <q-card-section class="bg-purple-ieen text-white">
                                <div class="text-h6">Encabezado</div> 
                                <q-item>
                                    <q-item-section avatar>
                                    <q-avatar>
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                                    </q-avatar>
                                    </q-item-section>
                                </q-item>
                                                    
                            </q-card-section>
                            <q-card-section>
                                <div class="text-h6">Cuerpo de la Card</div>
                                <q-img
                                    src="https://cdn.quasar.dev/img/parallax2.jpg"
                                    />

                                
                            </q-card-section>                           
                            <q-card-actions class="bg-purple-ieen text-white">
                                <div class="text-h6">Pie de Card</div>
                                <q-card-section>
                                    <div class="text-h6">Our Changing Planet</div>
                                    <div class="text-subtitle2">by John Doe</div>
                                </q-card-section>
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-2 q-gutter-sm"></div>      
                </div>
            </div>
        </div>
        <h4>Opciones de Dialog</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Tipo de Dialog</label><br>
                        <div class="q-gutter-xs">
                            <q-btn label="Alerta" color="purple-ieen" @click="alert = true" />
                                <q-dialog v-model="alert">
                                    <q-card>
                                        <q-card-section>
                                        <div class="text-h6">Alerta</div>
                                        </q-card-section>

                                        <q-card-section class="q-pt-none">
                                        Este es un ejemplo de un dialog, en forma de alerta, sirve para notificar alguna acción realizada, con boton de OK para cerrar
                                        </q-card-section>

                                        <q-card-actions align="right">
                                        <q-btn flat label="OK" color="purple-ieen" v-close-popup />
                                        </q-card-actions>
                                    </q-card>
                                </q-dialog>
                            <q-btn label="Confirmación" color="purple-ieen" @click="confirm = true" />
                                <q-dialog v-model="confirm" persistent>
                                    <q-card>
                                        <q-card-section class="row items-center">
                                        <q-avatar icon="article" color="purple-ieen" text-color="white" />
                                        <span class="q-ml-sm">Este es un ejemplo de dialog de confirmación, sirve para aceptar o cancelar una acción que esta por ocurrir</span>
                                        </q-card-section>

                                        <q-card-actions align="right">
                                        <q-btn flat label="Cancelar" color="purple-ieen" v-close-popup />
                                        <q-btn flat label="Aceptar" color="purple-ieen" v-close-popup />
                                        </q-card-actions>
                                    </q-card>
                                </q-dialog>
                            <q-btn label="Input" color="purple-ieen" @click="prompt = true" />
                                <q-dialog v-model="prompt" persistent>
                                    <q-card style="min-width: 350px">
                                        <q-card-section>
                                        <div class="text-h6">Solicitar dato</div>
                                        </q-card-section>

                                        <q-card-section class="q-pt-none">
                                        <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
                                        </q-card-section>

                                        <q-card-actions align="right" class="text-primary">
                                        <q-btn flat label="Cancelar" v-close-popup />
                                        <q-btn flat label="Agregar Dato" v-close-popup />
                                        </q-card-actions>
                                    </q-card>
                                </q-dialog>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Dialog con diferentes estilos</label><br>
                        <div class="q-gutter-xs">
                            <q-btn label="Con icono de cerrar" color="purple-ieen" @click="icon = true" />
                                <q-dialog v-model="icon">
                                    <q-card>
                                        <q-card-section class="row items-center q-pb-none">
                                        <div class="text-h6">Icono para cerrar Dialog</div>
                                        <q-space />
                                        <q-btn icon="close" flat round dense v-close-popup />
                                        </q-card-section>
                                        <q-card-section>
                                        Este Dialog puede ser con cualquiera de los tipos anteriores mencionados, solo que este cuenta con un Icono para cerrarlo
                                        </q-card-section>
                                    </q-card>
                                </q-dialog>
                            <q-btn label="Con barra superior" color="purple-ieen" @click="bar2 = true" />
                                <q-dialog v-model="bar2" persistent transition-show="flip-down" transition-hide="flip-up">
                                    <q-card class="bg-purple-ieen text-white">
                                        <q-bar>                                      
                                        <div>Agregar aqui elementos a esta barra</div>
                                        <q-space />
                                        <q-btn dense flat icon="close" v-close-popup>
                                            <q-tooltip class="bg-white text-purple-ieen">Cerrar</q-tooltip>
                                        </q-btn>
                                        </q-bar>

                                        <q-card-section>
                                        <div class="text-h6">Dialog con Barra</div>
                                        </q-card-section>
                                        <q-card-section class="q-pt-none">
                                            Este es un dialog con el cual podemos agregar elementos que necesitamos en una barra superior, igual aplica con cualquier tipo de dialog
                                        </q-card-section>
                                    </q-card>
                                </q-dialog>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Dialog en diferentes posiciones</label><br>
                        <div class="q-gutter-xs">
                            <q-btn label="Arriba" icon="keyboard_arrow_up" color="purple-ieen" @click="open('top')" />
                            <q-btn label="Derecha" icon="keyboard_arrow_right" color="purple-ieen" @click="open('right')" />
                            <q-btn label="Abajo" icon="keyboard_arrow_down" color="purple-ieen" @click="open('bottom')" />
                            <q-btn label="Izquierda" icon="keyboard_arrow_left" color="purple-ieen" @click="open('left')" />

                            <q-dialog v-model="dialog" :position="position">
                                <q-card>
                                    <q-card-section class="row items-center q-pb-none">
                                    <div class="text-h6">Dialog en posición {{position}} de la pantalla</div>
                                    <q-space />
                                    <q-btn icon="close" flat round dense v-close-popup />
                                    </q-card-section>
                                    <q-card-section>
                                    Esta opcion, nos permite posicionar los dialog en diferentes puntos de la pantalla
                                    </q-card-section>
                                </q-card>
                            </q-dialog>
                        </div>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold">Dialog maximizado</label><br>
                        <q-btn label="Maximized" color="purple-ieen" @click="dialogM = true" />
                        <q-dialog
                            v-model="dialogM"
                            persistent
                            :maximized="maximizedToggle"
                            transition-show="slide-up"
                            transition-hide="slide-down"
                            >
                            <q-card class="bg-purple-ieen text-white">
                                <q-bar>
                                <q-space />

                                <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                                    <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimizar</q-tooltip>
                                </q-btn>
                                <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                                    <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximizar</q-tooltip>
                                </q-btn>
                                <q-btn dense flat icon="close" v-close-popup>
                                    <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
                                </q-btn>
                                </q-bar>

                                <q-card-section>
                                <div class="text-h6">Dialog maximizado con opcion de minimizar</div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                    Este Dialog aparecera Maximizado, pero trae opción para minimizarlo, volverlo a maximizar y por supuesto para cerrarlo
                                </q-card-section>
                            </q-card>
                            </q-dialog>
                    </div>      
                </div>
            </div>
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold"> Dialog tipo de posicionamiento en pantalla</label>
                        <div class="q-gutter-xs">
                            <q-btn label="Bloquea pantalla" color="purple-ieen" @click="persistent = true" />
                            <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
                                <q-card class="bg-purple-ieen text-white" style="width: 300px">
                                    <q-card-section>
                                    <div class="text-h6">Pantalla bloqueada</div>
                                    </q-card-section>

                                    <q-card-section class="q-pt-none">
                                    Este tipo de Dialog, bloquea la pantalla, no permite realizar otra accion hasta cerrarlo.
                                    </q-card-section>

                                    <q-card-actions align="right" class="bg-purple-ieen text-white">
                                    <q-btn flat label="OK" v-close-popup />
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                            <q-btn label=" Flota en pantalla" color="purple-ieen" @click="seamless = true" />
                            <q-dialog v-model="seamless" seamless position="bottom">
                                <q-card class="bg-purple-ieen text-white" style="width: 300px">
                                    <q-card-section>
                                    <div class="text-h6">Dialog flotante</div>
                                    </q-card-section>

                                    <q-card-section class="q-pt-none">
                                    Este tipo de Dialog aparece en una posicion de la pantalla, pero no interfiere para seguir realizando acciones dentro de la misma, desaparece hasta que se da clic.
                                    </q-card-section>

                                    <q-card-actions align="right" class="bg-purple-ieen text-white">
                                    <q-btn flat label="OK" v-close-popup />
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Dialog dentro de otro Dialog</label><br>
                        <q-btn label="Dialog Principal" color="purple-ieen" @click="inception = true" />
                        <q-dialog v-model="inception">
                        <q-card>
                            <q-card-section>
                            <div class="text-h6">Dialog Principal</div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                Este es el Dialog principal, cuenta con un boton para cerrar y otro para abrir el secundario
                            </q-card-section>

                            <q-card-actions align="right" class="text-purple-ieen">
                            <q-btn flat label="Abrir Dialog Secundario" @click="secondDialog = true" />
                            <q-btn flat label="Cerrar" v-close-popup />
                            </q-card-actions>
                        </q-card>
                        </q-dialog>

                        <q-dialog v-model="secondDialog" persistent transition-show="scale" transition-hide="scale">
                        <q-card class="bg-purple-ieen text-white" style="width: 300px">
                            <q-card-section>
                            <div class="text-h6">Secundario</div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                            Este es el dialog secundaria, puede aplicar cualquier tipo
                            </q-card-section>

                            <q-card-actions align="right" class="bg-purple-ieen text-white">
                            <q-btn flat label="OK" v-close-popup />
                            </q-card-actions>
                        </q-card>
                        </q-dialog>
                    </div>
                    <div class="col-3">
                    </div>
                    <div class="col-2 q-gutter-sm">
                    </div>      
                </div>
            </div>
        </div> 
         <h4>Notificaciones tipo Toast</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Estos son los tipos de notificaciones TOAST</label><br>
                        <div class="row q-gutter-sm">
                            <q-btn no-caps unelevated color="positive" @click="triggerPositive" label="Positivo" />
                            <q-btn no-caps unelevated color="negative" @click="triggerNegative" label="Negativo" />
                            <q-btn no-caps unelevated color="warning" text-color="dark" @click="triggerWarning" label="Advertencia" />
                            <q-btn no-caps unelevated color="info" @click="triggerInfo" label="Informativa" />
                        </div>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Notificación de porcentaje de avance</label><br>
                         <q-btn no-caps color="purple" @click="showNotif" label="Ver Notificación" />
                    </div>
                    <div class="col-3">
                        <label class="text-bold"></label>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div> 
        <h4>Botones flotantes</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Boton flotante normal</label> <br>
                        <q-layout view="lhh LpR lff" container style="height: 300px" class="shadow-2 rounded-borders">
                            <q-header class="bg-purple-ieen">
                                <q-toolbar>
                                <q-btn flat round dense icon="menu" />
                                <q-toolbar-title>Header</q-toolbar-title>
                                </q-toolbar>
                            </q-header>

                            <q-page-container>
                                <q-page padding>
                                <p v-for="n in 8" :key="n">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
                                </p>

                                <q-page-sticky position="bottom-right" :offset="[18, 18]">
                                    <q-btn fab icon="add" color="purple-ieen" />
                                </q-page-sticky>
                                </q-page>
                            </q-page-container>
                        </q-layout>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Direccion a donde se desprenda el menu</label>
                        <div class="column items-center" style="margin-top: 10px; margin-bottom: 10px;">
                            <q-fab color="purple-ieen" icon="keyboard_arrow_up" direction="up">
                                <q-fab-action color="purple-ieen" @click="onClick" icon="mail" />
                                <q-fab-action color="purple-ieen" @click="onClick" icon="alarm" />
                            </q-fab>

                            <q-fab color="purple-ieen"  icon="keyboard_arrow_left" direction="left">
                                <q-fab-action color="purple-ieen" text-color="white" @click="onClick" icon="mail" />
                                <q-fab-action color="purple-ieen" text-color="white" @click="onClick" icon="alarm" />
                            </q-fab>

                            <q-fab color="purple-ieen" push icon="keyboard_arrow_right" direction="right">
                                <q-fab-action color="purple-ieen" @click="onClick" icon="mail" />
                                <q-fab-action color="purple-ieen" @click="onClick" icon="alarm" />
                            </q-fab>

                           
                            <q-fab color="purple-ieen" glossy icon="keyboard_arrow_down" direction="down">
                                <q-fab-action color="purple-ieen"  @click="onClick" icon="mail" />
                                <q-fab-action color="purple-ieen"  @click="onClick" icon="alarm" />
                            </q-fab>
                            </div>
                    </div>
                    <div class="col-3">
                    </div>
                    <div class="col-2 q-gutter-sm">
                    </div>      
                </div>
            </div>
        </div> 
         <h4>Scroll, Pantalla de espera y Vista previa</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Cuando se quiera ahorrar espacio con un elemento que ocupo mucho espacio, podemos aplicar el scroll</label>
                        <div ref="scrollTargetRef" class="q-pa-md" style="max-height: 250px; overflow: auto;">
                            <q-infinite-scroll @load="onLoadRef" :offset="250" :scroll-target="scrollTargetRef">
                                <div v-for="(item, index) in itemsRef" :key="index" class="caption">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</p>
                                </div>
                                <template v-slot:loading>
                                <div class="row justify-center q-my-md">
                                    <q-spinner-dots color="primary" size="40px" />
                                </div>
                                </template>
                            </q-infinite-scroll>
                        </div>
                    </div> 
                    <div class="col-3">
                         <label class="text-bold">Una herramienta para poner la pantalla en espera en lo que se realiza por completo un proceso</label><br>
                         <q-btn color="purple-ieen" @click="showLoading" label="Ver Loading" >
                            
                        </q-btn><br>
                    </div>   
                    <div class="col-3">
                        <label class="text-bold"> La etiqueta skeleton ayuda a creer una vista previa de un componente en lo que esté se cargue por completo. </label> <br>
                        <q-card style="max-width: 300px">
                            <q-item>
                                <q-item-section avatar>
                                <q-skeleton type="QAvatar" />
                                </q-item-section>

                                <q-item-section>
                                <q-item-label>
                                    <q-skeleton type="text" />
                                </q-item-label>
                                <q-item-label caption>
                                    <q-skeleton type="text" />
                                </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-skeleton height="200px" square />

                            <q-card-actions align="right" class="q-gutter-md">
                                <q-skeleton type="QBtn" />
                                <q-skeleton type="QBtn" />
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-2">
                        <label class="text-bold"> Los tipos de elementos a los que se le puede aplicar la etiqueta skeleton, son los siguientes:</label><br>
                        <label> 'text', 'rect', 'circle','QBtn', 'QBadge', 'QChip', 'QToolbar','QCheckbox', 'QRadio', 'QToggle','QSlider', 'QRange', 'QInput','QAvatar'</label>
                    </div>
                </div>
            </div>
        </div> 
        <h4>Lineas de progreso y listas</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Las lineas de progreso nos sirven para representar el porcentaje de avance de algun dato(Dos ejemplos con diferente tamaño)</label><br>
                         <q-linear-progress size="25px" :value="progress1" color="purple-ieen">
                            <div class="absolute-full flex flex-center">
                                <q-badge color="white" text-color="accent" :label="progressLabel1" />
                            </div>
                            </q-linear-progress>

                            <q-linear-progress size="50px" :value="progress2" color="purple-ieen" class="q-mt-sm">
                            <div class="absolute-full flex flex-center">
                                <q-badge color="white" text-color="accent" :label="progressLabel2" />
                            </div>
                        </q-linear-progress>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Lista con items sencillos, con una separación mas corta</label><br>
                        <q-list dense bordered padding class="rounded-borders">
                            <q-item clickable v-ripple>
                                <q-item-section>
                                Opción1
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section>
                                Opción 2
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section>
                                Opción 3
                                </q-item-section>
                            </q-item>
                            </q-list>
                    </div>
                    <div class="col-3">
                        <label class="text-bold"> Lista con iconos</label><br>
                        <q-list bordered>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                <q-icon color="purple-ieen" name="bluetooth" />
                                </q-item-section>

                                <q-item-section>Opcion con icono</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                <q-avatar color="purple-ieen" text-color="white" icon="bluetooth" />
                                </q-item-section>

                                <q-item-section>Icono tipo avatar</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                <q-avatar rounded color="purple-ieen" text-color="white" icon="bluetooth" />
                                </q-item-section>

                                <q-item-section>Icono tipo avatar redondeado</q-item-section>
                            </q-item>

                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                <q-avatar color="purple-ieen" text-color="white">
                                    R
                                </q-avatar>
                                </q-item-section>

                                <q-item-section>Icono grande</q-item-section>
                            </q-item>
                        </q-list>

                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div> 
        <h4>Tablas</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-12">
                        <label class="text-bold">Tabla sencilla</label>
                        <q-table
                            title="Ejemplo"
                            :rows="rows"
                            :columns="columns"
                            :filter="textB"
                            color="purple-ieen"
                            v-model:pagination="pagination"
                            no-data-label="No se encontraron registros"
                            rows-per-page-label="Registros por página"                         
                            >
                            <template v-slot:top-right>
                                <q-input v-model="textB" dense label="Buscar"  class="q-pr-md">
                                <template v-slot:append>
                                    <q-icon v-if="textB !== ''" name="close" @click="textB = ''" class="cursor-pointer" />
                                    <q-icon v-else name="search" />
                                </template>
                                </q-input>
                                <q-btn flat round color="purple-ieen" icon="archive" @click="exportTable"/>
                            </template>
                        </q-table>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-12">
                        <label class="text-bold">Tabla con campo oculto</label><br>
                        <q-table
                            title="Ejemplo con campo a expandir"
                            :rows="rows2"
                            :columns="columns2"
                            row-key="name"
                            no-data-label="No se encontraron registros"
                            rows-per-page-label="Registros por página" 
                            >

                            <template v-slot:header="propiedad">
                                <q-tr :props="propiedad">
                                <q-th auto-width />
                                <q-th
                                    v-for="col in propiedad.cols"
                                    :key="col.name"
                                    :props="propiedad"
                                >
                                    {{ col.label }}
                                </q-th>
                                </q-tr>
                            </template>

                            <template v-slot:body="propiedad">
                                <q-tr :props="propiedad">
                                <q-td auto-width>
                                    <q-btn size="sm" color="accent" round dense @click="propiedad.expand = !propiedad.expand" :icon="propiedad.expand ? 'remove' : 'add'" />
                                </q-td>
                                <q-td
                                    v-for="col in propiedad.cols"
                                    :key="col.name"
                                    :props="propiedad"
                                >
                                    {{ col.value }}
                                </q-td>
                                </q-tr>
                                <q-tr v-show="propiedad.expand" :props="propiedad">
                                <q-td colspan="100%">
                                    <div class="text-left">Campo expandido para mostrar contenido {{ propiedad.row.name }}.</div>
                                </q-td>
                                </q-tr>
                            </template>

                        </q-table>
                    </div>
                        
                </div>
            </div>
        </div> 
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-12">
                        <label class="text-bold">Tabla en forma de tarjetas por cada fila</label><br>
                        <q-table
                            grid
                            title="Treats"
                            :rows="rows"
                            :columns="columns"
                            row-key="name"
                            :filter="filter"
                            hide-header
                            >
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                                </q-input>
                            </template>
                        </q-table>
                    </div>  
                </div>
            </div>
        </div>
        <h4>Paginación</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Paginación normal</label><br>
                        <q-pagination
                            v-model="current"
                            :max="5"
                            color="purple-ieen"
                            
                        />
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Paginación con iconos</label><br>
                         <q-pagination
                            v-model="current1"
                            :max="5"
                            input
                            color="purple-ieen"
                            
                        />
                    </div>
                    <div class="col-3">
                        <label class="text-bold"></label>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div> 
        <h4>Popup y separador</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold">Este Popup serviria para hacer el aviso de que se perdio la conexión con el internet</label> <br>
                         <q-btn push color="purple-ieen" label="Prueba Popup">
                            <q-popup-proxy>
                                <q-banner>
                                <template v-slot:avatar>
                                    <q-icon name="signal_wifi_off" color="purple-ieen" />
                                </template>
                                Se perdio la conexión de internet, aplicación fuera de linea
                                </q-banner>
                            </q-popup-proxy>
                        </q-btn>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Separadores horizontales</label><br>
                        <q-card style="max-width: 250px">
                            <q-card-section>
                            <div class="text-h6">Separador Horizontal</div>
                            <div class="text-subtitle2">etiqueta q-separator</div>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions>
                            <q-btn label="Opcion 1" color="purple-ieen" flat />
                            <q-btn label="Opcion 2" color="purple-ieen" flat />
                            </q-card-actions>
                        </q-card>
                    </div>
                    <div class="col-3">
                        <label class="text-bold">Separadores Verticales</label><br>
                         <q-toolbar class="bg-purple-ieen shadow-2 rounded-borders">
                            <q-btn flat round dense icon="menu" class="q-mr-sm" color="white" />

                            <q-separator vertical inset  color="white"/>

                            <q-btn stretch flat label="Opción 1" text-color="white" />

                            <q-separator vertical color="white" />

                            <q-btn stretch flat label="Opción 2" text-color="white"  />

                            <q-separator vertical color="white" />

                        </q-toolbar>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div> 
         <h4>Secuencias o paso a paso</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-6">
                        <label class="text-bold">Con este elemento, se podran llevar a cabo procesos uno por uno, paso a paso, siguiendo una secuencia. Etiqueta stepper</label><br>
                        <q-stepper
                            v-model="step"
                            ref="stepper"
                            color="purple-ieen"
                            animated
                            >
                            <q-step
                                :name="1"
                                title="Inicio del proceso"
                                icon="settings"
                                :done="step > 1"
                            >
                                Este seria el inicio del proceso
                            </q-step>

                            <q-step
                                :name="2"
                                title="Segundo paso"
                                caption="Optional"
                                icon="create_new_folder"
                                :done="step > 2"
                            >
                                Este bloque continua con el proceso
                            </q-step>

                            <q-step
                                :name="3"
                                title="Tercer paso"
                                icon="assignment"
                                
                            >
                                Esta ventana continua con el procedimiento
                            </q-step>

                            <q-step
                                :name="4"
                                title="Fin del Proceso"
                                icon="add_comment"
                            >
                                Este seria el final del procesamiento
                            </q-step>
                            <template v-slot:navigation>
                                    <q-stepper-navigation>
                                    <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finalizar' : 'Siguiente'" />
                                    <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
                                    </q-stepper-navigation>
                            </template>
                        </q-stepper>
                    </div>
                    <div class="col-5">
                        <label class="text-bold">Tambien se puede poner en modo vertical</label><br>
                        <q-stepper
                            v-model="stepV"
                            vertical
                            color="primary"
                            animated
                            >
                            <q-step
                                :name="1"
                                title="Inicio del proceso"
                                icon="settings"
                                :done="stepV > 1"
                            >
                                Este seria el inicio del proceso

                                <q-stepper-navigation>
                                <q-btn @click="stepV = 2" color="purple-ieen" label="Continuar" />
                                </q-stepper-navigation>
                            </q-step>

                            <q-step
                                :name="2"
                                title="Segundo paso"
                                
                                icon="create_new_folder"
                                :done="stepV > 2"
                            >
                                Este bloque continua con el proceso

                                <q-stepper-navigation>
                                <q-btn @click="stepV = 4" color="purple-ieen" label="Continuar" />
                                <q-btn flat @click="stepV = 1" color="purple-ieen" label="Atras" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </q-step>

                            <q-step
                                :name="3"
                                title="Tercer paso bloqueado"
                                icon="assignment"
                                disable
                            >
                                Esta ventana continua con el procedimiento
                            </q-step>

                            <q-step
                                :name="4"
                                title="Fin Proceso"
                                icon="add_comment"
                            >
                                Este seria el final del procesamiento
                                <q-stepper-navigation>
                                <q-btn color="purple-ieen" label="Finalizar" />
                                <q-btn flat @click="stepV = 2" color="purple-ieen" label="Atras" class="q-ml-sm" />
                                </q-stepper-navigation>
                            </q-step>
                            </q-stepper>
                    </div>
                       
                </div>
            </div>
        </div> 
        <h4>TABS</h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-6">
                        <label class="text-bold">Panel tabs de modo horizontal</label><br>
                        <q-card>
                            <q-tabs
                                v-model="tab"
                                dense
                                class="text-purple-ieen"
                                active-color="pink-ieen-3"
                                indicator-color="pink-ieen-1"
                                align="justify"
                            >
                                <q-tab name="uno" label="Opción 1" />
                                <q-tab name="dos" label="Opción 2" />
                                <q-tab name="tres" label="Opción 3" />
                            </q-tabs>

                            <q-separator />

                            <q-tab-panels v-model="tab" animated>

                                <q-tab-panel name="uno">
                                <div class="text-h6">Opción 1</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </q-tab-panel>
                                
                                <q-tab-panel name="dos">
                                <div class="text-h6">Opción 2</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </q-tab-panel>

                                <q-tab-panel name="tres">
                                <div class="text-h6">Opción 3</div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </q-tab-panel>
                            </q-tab-panels>
                        </q-card>
                    </div>
                    <div class="col-5">
                        <label class="text-bold">Panel tabs de modo vertical</label><br>
                        <q-splitter
                            v-model="splitterModel"
                            style="height: 250px"
                            >

                            <template v-slot:before>
                                <q-tabs
                                v-model="tab"
                                vertical
                                class="text-pink-ieen-1"
                                >
                                <q-tab name="one" icon="looks_one" label="Opción 1" />
                                <q-tab name="two" icon="looks_two" label="Opción 2" />
                                <q-tab name="three" icon="looks_3" label="Opción 3" />
                                </q-tabs>
                            </template>

                            <template v-slot:after>
                                <q-tab-panels
                                v-model="tab"
                                animated
                                swipeable
                                vertical
                                transition-prev="jump-up"
                                transition-next="jump-up"
                                >
                                <q-tab-panel name="one">
                                    <div class="text-h4 q-mb-md">Opción 1</div>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                </q-tab-panel>

                                <q-tab-panel name="two">
                                    <div class="text-h4 q-mb-md">Opción 2</div>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                </q-tab-panel>

                                <q-tab-panel name="three">
                                    <div class="text-h4 q-mb-md">Opción 3</div>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                                    
                                </q-tab-panel>
                                </q-tab-panels>
                            </template>

                        </q-splitter>
                    </div>   
                </div>
            </div>
        </div> 
        <!--
        <h4></h4>
        <div class="column">
            <div class="col">
                <div class="row q-pa-sm q-gutter-md">
                    <div class="col-3">
                        <label class="text-bold"></label>
                    </div>
                    <div class="col-3">
                        <label class="text-bold"></label>
                    </div>
                    <div class="col-3">
                        <label class="text-bold"></label>
                    </div>
                    <div class="col-2 q-gutter-sm">
                        <label class="text-bold"></label>
                    </div>      
                </div>
            </div>
        </div> 
        -->
    </div>
</template>

<script>
import { defineComponent, ref, computed, onBeforeUnmount} from 'vue'
import { exportFile, useQuasar,QStepperNavigation, Notify, QStepper } from 'quasar'
import {api} from '../../boot/axios.js'



const columns = [
                { name: 'name', field: rows2 => rows2.name ,format: val => `${val}`,align: 'left', label: 'Columna 1', field: 'Columna1', sortable: true },
                { name: 'Columna2', align: 'left', label: 'Columna 2', field: 'Columna2', sortable: true, },
                { name: 'Columna3', align: 'left', label: 'Columna 3', field: 'Columna3' },
                { name: 'Columna4', align: 'left', label: 'Columna 4', field: 'Columna4' },
                
            ]
 const rows=[
            {
                Columna1: "Registro1",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
             {
                Columna1: "Registro2",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
             {
                Columna1: "Registro3",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
             {
                Columna1: "Registro4",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
            
        ]

const columns2 = [
                { name: 'Columna1', align: 'left', label: 'Columna 1', field: 'Columna1', sortable: true },
                { name: 'Columna2', align: 'left', label: 'Columna 2', field: 'Columna2', sortable: true, },
                { name: 'Columna3', align: 'left', label: 'Columna 3', field: 'Columna3' },
                { name: 'Columna4', align: 'left', label: 'Columna 4', field: 'Columna4' },
                
            ]
 const rows2=[
            {
                Columna1: "Registro1",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
             {
                Columna1: "Registro2",
                Columna2: "Hola columna5",
                Columna3: "Hola columna6",
                Columna4: "Hola columna7"
            },
             {
                Columna1: "Registro3",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
             {
                Columna1: "Registro4",
                Columna2: "Hola columna2",
                Columna3: "Hola columna3",
                Columna4: "Hola columna4"
            },
            
        ]


export default defineComponent({
    setup() {
        const $q = useQuasar()
        let timer

        const submitting = ref(false)       
        const text = ref("")
        const textB = ref('')
        const text1 = ref("")
        const onItemClick = ref(false)
        const modelbutton = ref('one')
        const dialog = ref(false)
        const position = ref('top')
        const items = ref([ {}, {}, {}, {}, {}, {}, {} ])
        const itemsRef = ref([ {}, {}, {}, {}, {}, {}, {} ])    
        const scrollTargetRef = ref(null)
        const visible = ref(false)
        const showSimulatedReturnData = ref(false)
        const progress1 = ref(0.3)
        const progress2 = ref(0.9) 
        const inputRef = ref(null)  
        const name = ref(null)
        const nameRef = ref(null)
        const age = ref(null)
        const ageRef = ref(null)
        const accept = ref(false)    
        const pruebaapi = async () =>{
                    const resp = await api.get(`/Areas/1`)
                    console.log(resp)    
                } 
        pruebaapi()    
        const pagination = ref({
            page: 1,
            rowsPerPage: 10,
            sortBy: 'name',
            descending: false,
            }
        )
        onBeforeUnmount(() => {
            if (timer !== void 0) {
                clearTimeout(timer)
                $q.loading.hide()
            }
            })
        return {
            eleccion: ref('opc1'),
            multiple: ref([]),
            
            submitting,
            columns,
            columns2,
            rows2,
            pagination,
            ModelValidacion:ref(''),
            inputRef,
            rows,
            current: ref(3),
            current1: ref(3),
            text,
            text1,
            onItemClick,
            visible,
            showSimulatedReturnData,
            model: ref(null),
            name,
            nameRef,
            nameRules: [
                val => (val && val.length > 0) || 'Por favor ingrese su nombre'
            ],
            age,
            ageRef,
            ageRules: [
                val => (val !== null && val !== '') || 'Por favor ingrese la edad',
                val => (val > 0 && val < 100) || 'Por favor ingrese edad real'
            ],
            accept,
            optionsb: [
                {
                label: 'Opción 1',
                value: 'opc1'
                },
                {
                label: 'Opción 3',
                value: 'opc2'
                },
                {
                label: 'Opción 3',
                value: 'opc3'
                }
            ],
            options: [
                'Opción 1', 'Opción 2', 'Opción 3'
            ],
            shape: ref(''),
            Opcion1: ref(true),
            Opcion2: ref(false),
            modelbutton,
            slide: ref(1),
            autoplay: ref(true),
            lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            alert: ref(false),
            confirm: ref(false),
            prompt: ref(false),
            address: ref(''),
            icon: ref(false),
            bar2: ref(false),
            dialog,
            position,        
            dialogM: ref(false),
            maximizedToggle: ref(true),
            seamless: ref(false),
            persistent: ref(false),
            inception: ref(false),
            secondDialog: ref(false),
            items,
            itemsRef,
            scrollTargetRef,
            textB,
            step: ref(1),
            stepV: ref(1),
             tab: ref('mails'),
            innerTab: ref('innerMails'),
            splitterModel: ref(20),
            showNotif () {
                const notif = $q.notify({
                group: false, // required to be updatable
                timeout: 0, // we want to be in control when it gets dismissed
                spinner: true,
                position: 'top-right',
                message: 'Cargando...',
                caption: '0%'
                })

                // we simulate some progress here...
                let percentage = 0
                const interval = setInterval(() => {
                percentage = Math.min(100, percentage + Math.floor(Math.random() * 22))

                // we update the dialog
                notif({
                    caption: `${percentage}%`
                })

                // if we are done...
                if (percentage === 100) {
                    notif({
                    icon: 'done', // we add an icon
                    spinner: false, // we reset the spinner setting so the icon can be displayed
                    message: 'Carga completa!',
                    timeout: 2500 // we will timeout it in 2.5s
                    })
                    clearInterval(interval)
                }
                }, 500)
            },

            open (pos) {
                position.value = pos
                dialog.value = true
            },
            onClick () {
        
            },
            
            onLoadRef (index, done) {
                setTimeout(() => {
                itemsRef.value.push({}, {}, {}, {}, {}, {}, {})
                done()
                }, 2000)
            }, 
            
            showTextLoading () {
                visible.value = true
                showSimulatedReturnData.value = false

                setTimeout(() => {
                visible.value = false
                showSimulatedReturnData.value = true
                }, 3000)
            },
            progress1,
            progressLabel1: computed(() => (progress1.value * 100).toFixed(2) + '%'),
            progress2,
            progressLabel2: computed(() => (progress2.value * 100).toFixed(2) + '%'),
           
           exportTable () {
        // naive encoding to csv format
                const content = [columns.map(col => wrapCsvValue(col.label))].concat(
                rows.map(row => columns.map(col => wrapCsvValue(
                    typeof col.field === 'function'
                    ? col.field(row)
                    : row[ col.field === void 0 ? col.name : col.field ],
                    col.format
                )).join(','))
                ).join('\r\n')

                const status = exportFile(
                'table-export.csv',
                content,
                'text/csv'
                )

                if (status !== true) {
                $q.notify({
                    message: 'Archivo no se pudo descargar...',
                    color: 'negative',
                    icon: 'warning'
                })
                }
            },  
        // Metodos para las notificaciones ----------------------------
            triggerPositive () {
                $q.notify({
                type: 'positive',
                message: 'Esta es una notificación tipo "Positiva".',
                position: 'top-right',
                progress: true,
                

                })

                
                
            },

            triggerNegative () {
                $q.notify({
                type: 'negative',
                message: 'Esta es una notificación tipo "Negativa".',
                position: 'top-right',
                progress: true
                })
            },

            triggerWarning () {
                $q.notify({
                type: 'warning',
                message: 'Esta es una notificación tipo "Advertencia".',
                position: 'top-right',
                progress: true
                })
            },

            triggerInfo () {
                $q.notify({
                type: 'info',
                message: 'Esta es una notificación tipo "Informativa".',
                position: 'top-right',
                progress: true
                })
            },
            onSubmit () {
                nameRef.value.validate()
                ageRef.value.validate()

                if (nameRef.value.hasError || ageRef.value.hasError) {
                    $q.notify({
                        color: 'negative',
                        message: 'Ingrese los datos solicitados',
                        position: 'top-right',
                        progress: true
                    })
                }else {
                    $q.notify({
                        icon: 'done',
                        color: 'positive',
                        message: 'Datos Guardados',
                        position: 'top-right',
                        progress: true
                    })
                }
            },

            onReset () {
                name.value = null
                age.value = null

                nameRef.value.resetValidation()
                ageRef.value.resetValidation()
            },
            showLoading () {
                $q.loading.show({
                message: 'Insertar texto de espera'
                })

                // hiding in 3s
                timer = setTimeout(() => {
                $q.loading.hide()
                timer = void 0
                }, 3000)
            }
    
        //-----------------------------------------------------------------//
                                        
        }
         function wrapCsvValue (val, formatFn) {
            let formatted = formatFn !== void 0
                ? formatFn(val)
                : val

            formatted = formatted === void 0 || formatted === null
                ? ''
                : String(formatted)

            formatted = formatted.split('"').join('""')
            /**
             * Excel accepts \n and \r in strings, but some other CSV parsers do not
             * Uncomment the next two lines to escape new lines
             */
            // .split('\n').join('\\n')
            // .split('\r').join('\\r')

            return `"${formatted}"`
        }
        
    },
})
</script>
