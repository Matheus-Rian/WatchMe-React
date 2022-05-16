import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  handleGenre: (id: number) => void;
  selectedGenre: number;
}

export function SideBar({ handleGenre, selectedGenre }: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleGenre(genre.id)}
            selected={selectedGenre === genre.id}
          />
        ))}
      </div>

    </nav>
  );
}