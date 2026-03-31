// done by reg ramos on 
// tuesday march 31st, 2026, 
// 4th period Jacob Justice's 
// Web Markup and Scripting class, 
// (2026SP.WEB.115.2842) on Module 10, 
// to submit through a folder, 
// onto a github repo page as confirmation, 
// for following along and listening to his lecture/lessons, 
// that he has demonstrated through VSCode, 
// and other possible various coding interpreters, 
// and/or virtual environments, 
// which should in return offer grades, 
// as stated by Mr. Justice himself.


const image = document.getElementById('image');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const buttonsDiv = document.getElementById('buttons');
let music = new Audio()

class Scene {
    constructor(image_path, text1, text2)
    {
        this.image_path = image_path;
        this.text1 = text1;
        this.text2 = text2;
        this.children = [];
    }

    setChildren(children)
    {
        this.children = children;
    }

    renderScene() 
    {
        image.src = this.image_path;
        text1.innerText = this.text1;
        text2.innerText = this.text2;
        buttonsDiv.innerHTML = ""
        for (let i = 0; i < this.children.length; i++)
        {
            let newButton = document.createElement('button');
            newButton.innerText = "Option " + (i+1)
            newButton.addEventListener('click', () => this.children[i].renderScene())
            newButton.addEventListener('click', () => this.exitScene())
            buttonsDiv.appendChild(newButton);
        }
    }

    exitScene()
    {

    }
}

class MusicScene extends Scene{
    constructor(image_path, text1, text2, audio_path)
    {
        super(image_path, text1, text2);
        this.audio_path = audio_path;
    }

    renderScene() {
        super.renderScene();
        music = new Audio(this.audio_path);
        music.play();
    }

    exitScene()
    {
        super.exitScene();
        music.pause()
    }
}

let introScene = new Scene("christian.png",
    "welcome to my flower garden",
    "click to move around");
let sceneA = new MusicScene("pikachu.png",
    "awww",
    "cute pokemon", "Investigations.mp3");
let sceneB = new MusicScene("jacob.png",
    "wow look",
    "awesome", "Dreamy_20Flashback.mp3");

introScene.setChildren([sceneA, sceneB]);
sceneA.setChildren([introScene]);
sceneB.setChildren([sceneA, introScene])
introScene.renderScene();