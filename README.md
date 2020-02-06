# curso-typescript

Projeto resultante do curso de TypeScript da Alura

## Notas - Criação e configurção de um projeto node com TypeScript

### Pré-requisitos
* Ter o node instaldo - https://nodejs.org/

### Iniciando um projeto do zero

* Crie o diretório de sua aplicação
* No terminal, na raiz do projeto digite:

```npm init```

Isso configurará o projeto com o node. 
Será gerado o arquivo package.json

* Crie a seguinte estrutura de pastas

- app
-- ts

Nossos arquivos TypeScript serão salvos dentro do diretório app/ts

### Instalando o compilador do typescript

No terminal, na raiz do projeto digite:

```npm install typescript@2.3.2 --save-dev```

### Configuração do compilador

#### O arquivo tsconfig.json

Precisamos criar o arquivo `tsconfig.json` que guardará as configurações do nosso compilador.

```
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "app/js"
    },
    "include": [
        "app/ts/**/*"
    ]
}
```

Com essa configuração o **tsc** (que é o compilador) irá transpilar todo o código da pasta `app/ts/` gerando o equivalente em JavaScript na versão es6 no diretório `app/js`

As páginas html deverão referenciar os arquivos js.

Obs.: É possível criar o arquivo `tsconfig.json` "padrão" utilizando o comando:

````tsc --init ```

### Transpilando o projeto

Uma vez criado o arquivo `tsconfig.json` basta digitar, da raiz do projeto, o comando

``` tsc ``

Isso irá . O tsc irá criar a pasta js e gerará todos os arquivos js dentro dela seguindo a mesma hieranquia de diretórios da pasta ts

#### Alterando o package.json

Adicione aos scripts

```
 "compile": "tsc"
```

Isso permitirá executar do terminal o comando: 

```npm run compile```

#### Automatizando o processo de compilação

Adicione aos scripts do package.json

```
"wath": "tsc -w"
```

No terminal, na raiz do projeto digite:

```npm wath```

 O terminal ficará parado e o compilador ficará observando as alterações dos arquivos. Quando um arquivo for alterado automaticamente será gerado o js correspondente.
 
  ### Forçando a tipagem das propriedade:
 
 Para desativar o tipo implícito any adicionar a chave `"noImplicitAny": true` no `tsconfig.json`

```
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "app/js",
        "noEmitOnError": true,
        "noImplicitAny": true
    },
    "include": [
        "app/ts/**/*"
    ]
}
```

### Tipos para bibliotecas externas

No npm, existe uma série de TypeScript definitons files para as mais diversas bibliotecas e frameworks do mercado. Por exemplo, se quisermos instalar o tsd do jQuery, acessamos

https://www.npmjs.com/package/@types/jquery

Se quisermos do lodash ou underscore acessamos

https://www.npmjs.com/package/@types/lodash

https://www.npmjs.com/package/@types/underscore
Dessa forma, antes de sair buscando pela internet os arquivos tsd que precisamos, podemos tentar a sorte executando o comando:

`npm install @types/nomeDaLibOuFramework --save-dev`

Nesse sentido, se quisermos instalar os tsd das três bibliotecas que foram citadas, fazemos:

```
npm install @types/jquery --save-dev
npm install @types/lodash --save-dev
npm install @types/underscore --save-dev
```

### Removendo os comentários do processo de compilação

Podemos fazer com que o compilador do TypeScript remova todos os comentários do arquivo JavaScript resultante da compilação do nosso código TypeScript. Para isso, basta adicionar a propriedade `"removeComments": true` no arquivo `tsconfig.json`.

### Forçar a não atribuição de null e undefined nas variáveis

Muitas vezes, atribuímos null e undefined à variáveis para realizarmos alguma espécie de controle. Mas esses tipos podem causar problemas em runtime em nosso código se não tivermos cuidado com eles:

Contudo, o TypeScript possui o modo strickNullChecks. Neste modo, null e undefined não fazem parte do domínio dos tipos e só podem ser atribuídos a eles mesmos. Com a exceção de undefined, que pode ser atribuído a void. Isso pode ser interessante para evitarmos valores nulos e indefinidos em nosso projeto.

Para ativar basta adicionar a propriedade `"strictNullChecks": true` no arquivo `tsconfig.json`.

### Habilitar uso de decorators

Para ativar em nosso compilador TypeScript o uso de decorators utilizamos a configuração experimentalDecorators. 

Basta adicionar a propriedade `"strictNullChecks": true` no arquivo `tsconfig.json`.


### Configurando um carregador de módulos

O loader é o responsável pelo carregamento do módulo principal da aplicação. A partir desse módulo todas as suas dependências são resolvidas dinamicamente, sem a necessidade de termos que importar cada script individualmente seguindo uma ordem de importação definida.

Vamos alterar o arquivo tsconfig.json e indicar para o TypeScript que ele deve usar o sistema de módulos do System.js:

Adicionar a propriedade `"module": "system"` em `compilerOptions`

Adicionar os scripts na página que carregará os módulos

```
<script src="lib/system.js"></script>
<script>
    System.defaultJSExtensions = true;
    System.import('js/app.js').catch(err => console.error(err));
</script>
```

Contudo, isso não é suficiente. Loaders usam XMLHttpRequest, ou seja, realizam requisições Ajax para baixar os módulos e para isso precisamos de um servidor que disponibiliza nossa aplicação para o browser.

### Servidor local

Precisamos servir nossa aplicação através de um servidor web. Utilizaremos o lite-server. Além dele servir a pasta `app` para nós, ele ainda suporta livereloading através do BrowserSync que traz embutido. Isso é perfeito, pois toda vez que os arquivos .ts forem modificados e os arquivos .js gerados nosso navegador automaticamente será recarregado.

Vamos instalar o lite-server com o comando:

```npm install lite-server@2.3.0 --save-dev```


Agora, no package.json vamos adicionar a chamada do servidor através do script "server":

`"server": "lite-server --baseDir=app"`

Quando executamos no terminal npm run server nosso servidor subirá e podemos acessar nossa aplicação através de http://localhost:3000. No entanto, é necessário abrir outro terminal e executar o comando `npm wath` para que o compilador em tempo real do TypeScript continue rodando.

### Rodando scripts paralelamente com o módulo concurrently

Vamos instalar o módulo concurrently. Ele nos permitirá rodar os dois scripts que criamos em paralelo nas plataformas Windows, MAC e Linux.

Execute o comando:

```npm install concurrently@3.4.0 --save-dev```

Agora, no package.json vamos adicionar a chamada do concurrently através do script "start" que iniciará tanto o compilador typescript quanto o servidor

`"start": "concurrently \"npm run watch\" \"npm run server\""`

No final os scripts ficarão assim:

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "tsc",
    "watch": "tsc -w",
    "server": "lite-server --baseDir=app",
    "start": "concurrently \"npm run watch\" \"npm run server\""
  },
```

Para inciciar execute

```npm start```



## TypeScript e Node.js

TypeScript não é uma linguagem exclusiva para frontend, ela pode ser usada também no backend com Node.js. Contudo, como existem milhares (sem exagero) de módulos criados no repositório do npm (um dos maiores do mundo), as chances dos módulos da sua aplicação não terem seu respectivo TypeScript Definition file são gigantes. A única garantia que você terá são as definições dos módulos padrões do Node.js:

```npm install @types/node --save-dev```

### Como fica o tsconfig.json?

Outro ponto importante, aliás, uma dica, é evitarmos o uso do strictNullChecks e do noImplicityAny. Caso estejam presentes no arquivo tsconfig.js seus valores devem ser false. A ativação dessas configurações poderá gerar inúmeros problemas com possíveis definições que você venha a baixar.

### Como fica o sistema de módulos?

Os módulos do Node.js usam o padrão commonjs. Felizmente o compilador TypeScript aceita este parâmetro na propriedade module do arquivo tsconfig.json.

Vejamos um exemplo de arquivo que configura o TypeScript para um ambiente Node.js:

```
{
    "compilerOptions": {
        "target": "es6",
        "outDir": "js",
        "noEmitOnError": true, 
        "noImplicitAny": false,
        "removeComments": true,
        "module": "commonjs",
        "strictNullChecks": false,
        "experimentalDecorators": true
    },
    "include": [
        "ts/**/*"
    ]
}
```

Há mais um detalhe importante.

Como realizaremos os imports?

Vejamos um código escrito sem TypeScript. Ele nada mais faz do que criar um novo arquivo no sistema de arquivos:

```
const { writeFile } = require('fs');

writeFile('teste.txt', 'Gravei no arquivo', err => {
    if(err) {
        return console.log('Não foi possível criar o arquivo');
    }
    console.log('arquivo criado com sucesso');
});
```

No entanto, quando estamos usando TypeScript, precisamos mudar a forma com que importamos nossos módulos:

// veja a diferença

```
import { writeFile } from 'fs';

writeFile('teste.txt', 'Gravei no arquivo', err => {
    if(err) {
        return console.log('Não foi possível criar o arquivo');
    }
    console.log('arquivo criado com sucesso');
});
```

Por debaixo dos panos o TypeScript transcompilará o arquivo para:
 
 ```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
fs_1.writeFile('teste.txt', 'Gravei no arquivo', err => {
    if (err) {
        return console.log('Não foi possível criar o arquivo');
    }
    console.log('arquivo criado com sucesso');
});
```

Para um codebase já existente, realizar essa mudança pode ser algo muito custoso.