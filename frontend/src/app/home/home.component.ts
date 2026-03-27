const link = document.createElement('a');
    link.href = 'assets/pdf/curriculo_larissa_gatti_site.pdf';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer') videoElement!: ElementRef<HTMLVideoElement>;

  isEnglish = false;
  isMobile = false;
  menuOpen = false;

  private links: { [key: string]: string } = {
    'gattijoias': 'https://gattijoias.netlify.app/',
    'dashboardLooker': 'https://lookerstudio.google.com/u/0/reporting/404af525-7203-4c1d-807a-6381ce5ba1b6/page/rCOkF',
    'agendaBlindada': 'https://agenda-blindada.streamlit.app/',
    'automacao': 'https://www.linkedin.com/feed/update/urn:li:activity:7414712864713637888/',
    'linkedin': 'https://www.linkedin.com/in/larissa-vitoria-gatti-7017aa197/',
    'resume': ''
  };

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 1024px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  ngAfterViewInit() {
    this.setupVideoObserver();
  }

  setupVideoObserver() {
    const options = {
      root: null,
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.videoElement.nativeElement.play();
        } else {
          this.videoElement.nativeElement.pause();
        }
      });
    }, options);

    if (this.videoElement) {
      observer.observe(this.videoElement.nativeElement);
    }
  }

  goToLink(project: string) {
    const url = this.links[project];

    if (url) {
      window.open(url, '_blank');
    } else {
      console.error('Projeto não encontrado:', project);
    }
  }

  downloadResume() {
    link.download = 'Curriculo_Larissa_Gatti.pdf';
    link.click();
  }

  openWhatsApp(language: 'EN' | 'PT' | ''): void {
    const phone = '5564992055785';

    const message =
      language === 'EN'
        ? "Hi! I came across your website and I'm interested in learning more about your services. Could we discuss a free assessment?"
        : "Olá! Encontrei seu site e tenho interesse em saber mais sobre seus serviços. Podemos conversar sobre um orçamento gratuito?";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
